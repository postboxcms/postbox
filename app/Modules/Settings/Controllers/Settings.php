<?php

namespace App\Modules\Settings\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Modules\Settings\Requests\StoreSettings;
use App\Modules\Settings\Models\SettingsModel;

class Settings extends Controller
{
    protected $data = [
        'name' => '',
        'image' => '',
        'image_full' => ''
    ];
    protected $recordExists;
    // protected $requests;

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
    }

    private function _saveToDB(String $mode, Array $settings) {
        // Check if data is present already else insert
        if(!$this->recordExists) {
            SettingsModel::insert($settings);
        } else {
            // dd($settings);
            foreach($settings as $setting) {
                if(($setting['parameter'] == $mode.'.image' || $setting['parameter'] == $mode.'.image_full') && $setting['value'] == null) {
                    $setting['value'] = SettingsModel::where('parameter',$setting['parameter'])->get('value')->toArray()[0]['value'];
                }
                SettingsModel::where('parameter',$setting['parameter'])->update(['value'=>$setting['value']]);
            }
        }
        // If data is already present update it
        return true;
    }

    private function _getData($mode) {
        $dbRecords = SettingsModel::where('parameter','like','%'.$mode.'.%')->get()->toArray();

        if(!empty($dbRecords)) {
            foreach($dbRecords as $field=>$record) {
                $key = str_replace($mode.'.','',$record['parameter']);
                $value = $record['value'];
                $this->data[$key] = $value;
            }
        } else {
            $this->data = array_map(function(){},$this->data);
        }

        return $this->data;
    }

    private function _getSiteData() {
        return $this->data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function main()
    {
        //Your code goes here
        $data['title'] = __('settings.title');
        return redirect('/settings/system');
    }

    public function systemSettings() {
        $data['title'] = __('settings.system_title');
        $data['icon'] = admin_menu_icon();      
        $data['app']  = $this->_getData('app');
        $data['site']  = $this->_getData('site');

        return view('Settings::System', $data);
    }

    public function saveSettings(StoreSettings $request) {
        // $this->requests = $request->all();
        if($request->hasFile('image')) {
            $request->image->store('settings', 'assets');
        }
        if($request->hasFile('image_full')) {
            $request->image_full->store('settings', 'assets');
        }

        $mode = $request->mode;
        foreach($request->all() as $parameter=>$value) {
            if($parameter !== 'mode' && $parameter !== '_token') {
                if(is_object($value) && $value->hashName() !== null) {
                    $value = (string)$value->hashName();
                }
                $settings[] = [
                    'parameter' => $mode.'.'.$parameter,
                    'value' => $value,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                $this->recordExists = SettingsModel::where('parameter',$mode.'.'.$parameter)->exists();
            }
        }

        $response = $this->_saveToDB($mode,$settings);

        return response()->json(['message'=>__('settings.'.$mode.'_save_success_message')]);
    }

    public function saveSiteSettings() {
        return response()->json(['message'=>__('settings.site_save_success_message')]);
    }

    public function menuBuilder() {
        $data['title'] = __('settings.menu_builder_title');
        $data['icon'] = admin_menu_icon();
        return admin_view('Settings::MenuBuilder', $data);
    }

}
