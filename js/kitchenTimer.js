function KitchenTimer(config) {
    this.config = config;
    this.alarmDate;
    this.countDownLength = 0;
    this.remainingTime = 0;
    this.intervalId = undefined;
    this.alarmId = undefined;
    this.alarmNotificationId = undefined;

    this.updateDisplay();
    this.initCountDown();
}

KitchenTimer.prototype.initCountDown = function() {
    self = this;
    self.config.triggerButton.onclick = function() {
        if (self.config.triggerButton.textContent === 'start') {
            var countDownLength = self.getCountDownLength();

            if (countDownLength > 0) {
                self.setCountDownLength(countDownLength);
                self.updateDisplay();
                self.setTriggerButtonDisplay('stop');
                self.startCountDown();
            }
            else {
                alert('Please set a time');
            }
        }
        else {
            self.stopCountDown();
        }

        return false;
    };
};

KitchenTimer.prototype.setTriggerButtonDisplay = function(label) {
    self = this;

    self.config.triggerButton.textContent = label;
};

KitchenTimer.prototype.setCountDownLength = function() {
    self = this;
    self.countDownLength = self.getCountDownLength();
    self.setRemainingTime(self.getCountDownLength());
};

KitchenTimer.prototype.getCountDownLength = function() {
    self = this;
    var hours = parseInt(self.config.timerElements.hours.value);
    var minutes = parseInt(self.config.timerElements.minutes.value);
    var seconds = parseInt(self.config.timerElements.seconds.value);

    var countDown = (hours * 3600) + (minutes * 60) + seconds;

    return countDown;
};

KitchenTimer.prototype.setRemainingTime = function(remainingTime) {
    self = this;

    self.remainingTime = remainingTime;
};

KitchenTimer.prototype.formatDisplay = function(nbSeconds) {
    var interval = nbSeconds;
    var nbHours = Math.floor((interval / 3600));
    interval -= (nbHours * 3600);
    var nbMinutes = Math.floor((interval / 60));
    interval -= (nbMinutes * 60);
    var nbSeconds = interval;

    return strPad(nbHours, 2, '0', 'STR_PAD_LEFT') + ':' + strPad(nbMinutes, 2, '0', 'STR_PAD_LEFT') + ':' + strPad(nbSeconds, 2, '0', 'STR_PAD_LEFT');
};

KitchenTimer.prototype.updateDisplay = function() {
    self = this;

    self.config.target.textContent = self.formatDisplay(self.remainingTime);
};

KitchenTimer.prototype.startCountDown = function() {
    self = this;

    self.intervalId = setInterval('self.decrementRemainingTime()', 1000);
    self.alarmDate = new Date(+new Date() + (self.countDownLength * 1000));
    self.setAlarm();
};

KitchenTimer.prototype.stopCountDown = function() {
    self = this;

    self.countDownLength = 0;
    self.remainingTime = 0;

    self.updateDisplay();
    self.setTriggerButtonDisplay('start');

    clearInterval(self.intervalId);
    setTimeout('self.cancelAlarm();', 3000);
};

KitchenTimer.prototype.setAlarm = function() {
    if (navigator.mozAlarms) {

        self = this;

        var request = navigator.mozAlarms.add(self.alarmDate, 'ignoreTimezone', {
            message: 'Timer ' + self.formatDisplay(self.countDownLength) + ' Complete'
        });

        request.onsuccess = function() {
            self.alarmId = this.result.id;
        };
    }
};

KitchenTimer.prototype.cancelAlarm = function() {
    if (navigator.mozAlarms) {

        if (this.alarmId) {
            navigator.mozAlarms.remove(this.alarmId);
        }

        clearTimeout(self.alarmNotificationId);
    }
};

KitchenTimer.prototype.decrementRemainingTime = function() {
    self = this;

    var remainingTime = Math.round((self.alarmDate - new Date()) / 1000);
    self.setRemainingTime(remainingTime);
    self.updateDisplay();
    if (self.remainingTime === 0) {
        self.stopCountDown();
    }
};

strPad = function(input, pad_length, pad_string, pad_type) {
    var output = input.toString();
    if (!pad_string) {
        pad_string = ' ';
    }
    if (pad_type === undefined) {
        pad_type = 'STR_PAD_RIGHT';
    }
    if (pad_type == 'STR_PAD_RIGHT') {
        while (output.length < pad_length) {
            output = output + pad_string;
        }
    } else if (pad_type == 'STR_PAD_LEFT') {
        while (output.length < pad_length) {
            output = pad_string + output;
        }
    } else if (pad_type == 'STR_PAD_BOTH') {
        var j = 0;
        while (output.length < pad_length) {
            if (j % 2) {
                output = output + pad_string;
            } else {
                output = pad_string + output;
            }
            j++;
        }
    }
    return output;
};

if (navigator.mozAlarms) {
    navigator.mozSetMessageHandler("alarm", function(mozAlarm) {
        var notification = navigator.mozNotification.createNotification('There you go', mozAlarm.data.message);
        notification.show();

        navigator.vibrate([2000, 2000, 2000, 2000, 2000]);
    });
}