<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AssetsLinkCommand extends Command
{
    /**
     * The console command signature.
     *
     * @var string
     */
    protected $signature = 'assets:link';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a symbolic link from "assets/storage" to "storage/app/public"';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (file_exists(assets_path('storage'))) {
            return $this->error('The "assets/storage" directory already exists.');
        }

        $this->laravel->make('files')->link(
            storage_path('app/assets'), assets_path('storage')
        );

        $this->info('The [assets/storage] directory has been linked.');
    }
}
