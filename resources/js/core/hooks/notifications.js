import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const useNotifier = () => {
  return function (message, type) {
    toastr.options = {
      positionClass: 'toast-top-right',
      hideDuration: 300,
      timeOut: 3000
    }
    if(type !== 'error') {
      toastr.success(message);
    } else {
      toastr.error(message);
    }
  }
}
