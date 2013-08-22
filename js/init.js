var timerElements = {
    hours: document.querySelector('select[name="hours"]'),
    minutes: document.querySelector('select[name="minutes"]'),
    seconds: document.querySelector('select[name="seconds"]'),
};

var kt1Button = document.querySelector('#startCountDown_1');
var kt1Target = document.querySelector('#countDown_1');

if (kt1Button && kt1Target) {
    var kt1 = new KitchenTimer({
        triggerButton: kt1Button,
        target: kt1Target,
        timerElements: timerElements
    });
}


//var kt2Button = document.querySelector('#startCountDown_2');
//var kt2Target = document.querySelector('#countDown_2');
//
//if (kt2Button && kt2Target) {
//    var kt2 = new KitchenTimer({
//        triggerButton: kt2Button,
//        target: kt2Target,
//        timerElements: timerElements
//    });
//}
//
//
//var kt3Button = document.querySelector('#startCountDown_3');
//var kt3Target = document.querySelector('#countDown_3');
//
//if (kt3Button && kt3Target) {
//    var kt3 = new KitchenTimer({
//        triggerButton: kt3Button,
//        target: kt3Target,
//        timerElements: timerElements
//    });
//}