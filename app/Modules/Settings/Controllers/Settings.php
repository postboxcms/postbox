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
        'twitter_title' => '',
        'twitter_description' => '',
        'twitter_site' => '',
        'twitter_image' => '',
        'facebook_title' => '',
        'facebook_description' => '',
        'facebook_site' => '',
        'facebook_image' => ''
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
        foreach($settings as $setting) {
            SettingsModel::where('parameter',$setting['parameter'])->updateOrCreate(['parameter'=>$setting['parameter']]);
            SettingsModel::where('parameter',$setting['parameter'])->update(['value'=>$setting['value']]);
        }
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
        $data['seo']  = $this->_getData('seo');
        $data['site']  = $this->_getData('site');
        return view('Settings::System', $data);
    }

    public function saveSettings(StoreSettings $request) {
        $mode = $request->mode;
        $prefix = $request->_prefix;

        if($request->hasFile('image')) {
            $request->image->store('settings', 'assets');
        }

        foreach($prefix as $_prefix) {
            if($request->hasFile($_prefix.'image')) {
                $request->{$_prefix.'image'}->store('settings', 'assets');
            }    
        }

        foreach($request->all() as $parameter=>$value) {
            if($parameter !== 'mode' && $parameter !== '_token' && $parameter !== '_prefix') {
                if(is_object($value) && $value->hashName() !== null) {
                    $value = (string)$value->hashName();
                }
                if($parameter == "image_flag") {
                    continue;
                }
                if($parameter == "image") {
                    if($request->image_flag == "1") {
                        $value = null;
                    }
                }

                foreach($prefix as $_prefix) {
                    if($parameter == $_prefix."image") {
                        if($request->{$_prefix.'image_flag'} == "1") {
                            $value = null;
                        }
                    }    
                    if($parameter == $_prefix."image_flag") {
                        continue;
                    }    
                }
                $settings[] = [
                    'parameter' => $mode.'.'.$parameter,
                    'value' => $value,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
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
