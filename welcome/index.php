<?php
error_reporting(0);

// Create a blank .env file
if(!file_exists(getcwd().'/../.env')) {
    fopen(getcwd().'/../.env','w');
}

$loadedExts = get_loaded_extensions();
$loadedExtsCodes = array_map('strtolower',$loadedExts);
$reqExts = array('BCMath','Ctype','JSON','Mbstring','OpenSSL','PDO','Tokenizer','XML');
$reqExtsCodes = array_map('strtolower',$reqExts);

$basePath = realpath(dirname(__FILE__) . '/..');
$_serverVars = filter_input_array(INPUT_SERVER);
if(isset($_serverVars['HTTP_X_FORWARDED_PROTO'])) {
    $baseUrl = $_serverVars['HTTP_X_FORWARDED_PROTO'] . "://" . $_serverVars['SERVER_NAME'] . str_replace('/welcome','',$_serverVars['REQUEST_URI']);
} else {
    $baseUrl = $_serverVars['REQUEST_SCHEME'] . "://" . $_serverVars['SERVER_NAME'] . str_replace('/welcome','',$_serverVars['REQUEST_URI']);
}


if(count(array_diff($reqExtsCodes,$loadedExtsCodes)) > 0 || version_compare( phpversion(),'7.1.3' ) < 1 || !is_accesible('storage') || !is_writable(dirname($basePath.'/bootstrap/cache')) || !is_writable($basePath.'/.env')) {
    $errFlag = 1;
    $errClass = 'btn-danger';
    $errFont = 'times';
} else {
    $errFlag = 0;
    $errClass = 'btn-success';
    $errFont = 'check';
}

function is_accesible($path) {
    $basePath = realpath(dirname(__FILE__) . '/..');
    if($path == 'storage') {
        $fstream = @fopen($basePath.'/'.$path.'/logs/laravel-'.date('Y-m-d').'.log','a');
        if(!is_resource($fstream)) {
            return false;
        }
        return true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- <base href="/postbox" /> -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Postbox</title>

  <!-- Custom fonts for this template-->
  <link href="js/admin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="css/admin/theme.css" rel="stylesheet">
  <!-- <link href="{{asset('css/admin/app-loading.css')}}" rel="stylesheet"> -->

</head>

<body class="bg-gradient-white">

  <div class="container" id="box">
    <div class="row justify-content-center border-0 my-2">
      <a class="container-brand d-flex align-items-center justify-content-center" href="{{admin_url('/')}}">
        <div class="container-brand-icon">
          <!-- <i class="fas fa-laugh-wink"></i> -->
          <img src= "images/logo_blue_min.png" height="56px" />
        </div>
        <div class="container-brand-text mx-3"></div>
      </a>
    </div>

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-8 col-lg-12 col-md-8">

        <div class="card o-hidden border-0 shadow-lg my-3">
          <div class="card-body p-0">
            <!-- @yield('content') -->
            <!-- Nested Row within Card Body -->
            <div class="row">
              <!-- <div class="col-lg-4 d-none d-lg-block bg-login-image bg-install-image">
                <img src="images/cms-background.jpg"/>
              </div> -->
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 install-heading text-gray-900 mb-5">
                        <span class="btn <?php echo $errClass; ?> btn-circle"><i class="fas fa-<?php echo $errFont; ?>"></i></span> System Check
                    </h1>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100" style="width:0%">
                      <span class="sr-only">70% Complete</span>
                    </div>
                  </div>
                  <div class="user health-check">
                    <div class="row mb-4">
                        <div class="col-md-6 col-sm-12 col-xs-12 col-xl-6 col-lg-12">
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <?php if(version_compare( phpversion(),'7.1.3' ) >= 1) { ?>
                                        <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                    <?php } else { ?>
                                        <span class="btn btn-danger btn-circle btn-sm"><i class="fas fa-times"></i></span>
                                    <?php } ?>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3>PHP Version - <?php echo phpversion(); ?></h3>
                                </div>
                            </div>
                            <?php for($i = 0; $i < count($reqExts); $i++) { ?>
                                <div class="row">
                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                        <?php if(in_array($reqExtsCodes[$i],$loadedExtsCodes)) { ?>
                                            <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                        <?php } else { ?>
                                            <span class="btn btn-danger btn-circle btn-sm"><i class="fas fa-times"></i></span>
                                        <?php } ?>
                                    </div>
                                    <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                        <h3><?php echo $reqExts[$i]; ?> PHP Extension</h3>
                                    </div>
                                </div>
                                <?php if($i == 4) { ?>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12 col-xl-6 col-lg-12">
                                <?php } ?>
                            <?php } ?>
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <?php if(!is_accesible('storage')) { ?>
                                        <span class="btn btn-danger btn-circle btn-sm"><i class="fas fa-times"></i></span>
                                    <?php } else { ?>
                                        <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                    <?php } ?>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3>Storage folder permissions</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <?php if(!is_writable(dirname($basePath.'/bootstrap/cache'))) { ?>
                                        <span class="btn btn-danger btn-circle btn-sm"><i class="fas fa-times"></i></span>
                                    <?php } else { ?>
                                        <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                    <?php } ?>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3>Bootstrap folder permissions</h3>
                                </div>
                            </div>
                            <div class="row">
                                <!-- <div class="col-md-2 col-sm-2 col-xs-2">
                                    <?php if(!is_writable($basePath.'/.env')) { ?>
                                        <span class="btn btn-danger btn-circle btn-sm"><i class="fas fa-times"></i></span>
                                    <?php } else { ?>
                                        <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                    <?php } ?>
                                </div> -->
                                <!-- <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3>Environment (.env) file permissions</h3>
                                    <small>(Change .env file permissions to read only after installation is complete)</small>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <!-- <hr/>-->
                    <div class="row">
                        <div class="col-md-8 pull-right text-center">
                        </div>
                        <div class="col-md-4 pull-right text-center">
                            <?php if($errFlag == 0) { ?>
                                <a class="btn btn-primary btn-block btn-user" href="<?php echo $baseUrl.'install'; ?>">Next step</a>
                            <?php } else { ?>
                                <a class="btn btn-light btn-block btn-user" href="#">Next step</a>
                            <?php } ?>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="js/admin/vendor/jquery/jquery.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="js/admin/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Postbox js -->
  <script src="js/admin/admin.js"></script>
  <script src="js/app.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  <script data-type="push-router" src="js/push-router/push-config.js" defer></script>
  <script data-type="push-router" src="js/push-router/push-router.js" defer></script>

</body>

</html>
