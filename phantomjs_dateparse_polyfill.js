(function () {
    var map = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };
    var rx = /(\d{4}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})/i;

    var fixStringDate = function (sDate) {
        //If sDate contains NNNN abc [N]N covert it to NNNN-NN-NN and add "T"
        //to turn it into an ISO8601 date string which PhantomJS can parse.
        var pDate = rx.exec(sDate);
        if (pDate) {
            sDate = sDate.replace(
                rx,
                pDate[1] + "-" + map[pDate[2]] + "-" + (pDate[3].length == 1 ? "0" : "") + pDate[3]
            );
        }
        return sDate;
    }

    Date = (function (JSDate) {

        function ctor() {
            this.constructor = newDate;
        }
        ctor.prototype = JSDate.prototype;
        newDate.prototype = new ctor();

        function newDate() {
            if (arguments.length === 1 && typeof arguments[0] === "string") {
                JSDate.prototype.constructor.call(null, fixStringDate(arguments[0]));
                this.__realDateObject = new JSDate(fixStringDate(arguments[0]))
            } else {
                JSDate.prototype.constructor.apply(null, arguments);
                //Can't get apply to work against JSDate's constructor. 
                //It always returns the current date and time. :-(
                if (arguments.length == 1)
                    this.__realDateObject = new JSDate(arguments[0]);
                else if (arguments.length == 2)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1]);
                else if (arguments.length == 3)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1], arguments[2]);
                else if (arguments.length == 4)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3]);
                else if (arguments.length == 5)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                else if (arguments.length == 6)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                else if (arguments.length == 7)
                    this.__realDateObject = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
            }
        }

        //These override are needed because if you call getDate() for instance on our new
        //subclass of Date, you will get an error to the effect of "object is not an instance of Date"
        //See http://stackoverflow.com/questions/6075231/how-to-extend-the-javascript-date-object
        //So we have to redirect all the calls to go against an instance of a real date!

        //It would be nice if we could iterate over Object.keys(new Date) to create these.
        //We can't because Date, being build in, has no keys.  I pulled the list of methods
        //to override from the w3Schools documentation for the date class:
        //http://www.w3schools.com/jsref/jsref_obj_date.asp
        //Of these UTC() and parse() have been omitted as being class methods not instance methods.
        var functions = ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleDateString", "toLocaleTimeString", "toLocaleString", "toString", "toTimeString", "toUTCString", "valueOf"]
        for (var i = 0; i < functions.length; i++) {
            (function (funcName) {
                newDate.prototype[funcName] = function () {
                    return JSDate.prototype[funcName].apply(this.__realDateObject, arguments);
                };
            })(functions[i]);
        }

        newDate.parse = function (sDate) {
            return JSDate.parse(fixStringDate(sDate));
        }

        return newDate;

    })(Date)

})();