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
    var rx = /(\d{4}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}) /i;

    function fixStringDate (sDate) {
        //If sDate contains NNNN abc [N]N covert it to NNNN-NN-NN and add "T"
        //to turn it into an ISO8601 date string which PhantomJS can parse.
        var pDate = rx.exec(sDate);
        if (pDate) {
            sDate = sDate.replace(
                rx,
                pDate[1] + "-" + map[pDate[2]] + "-" + (pDate[3].length == 1 ? "0" : "") + pDate[3] + "T"
            );
        }
        return sDate;
    }

    Date = (function (JSDate) {

        function newDate() {
            var theDate;
            if (arguments.length === 1 && typeof arguments[0] === "string") {
                theDate = new JSDate(fixStringDate(arguments[0]))
            } else {
                //Can't get apply to work against JSDate's constructor.
                //It always returns the current date and time. :-(
                if (arguments.length == 1)
                    theDate = new JSDate(arguments[0]);
                else if (arguments.length == 2)
                    theDate = new JSDate(arguments[0], arguments[1]);
                else if (arguments.length == 3)
                    theDate = new JSDate(arguments[0], arguments[1], arguments[2]);
                else if (arguments.length == 4)
                    theDate = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3]);
                else if (arguments.length == 5)
                    theDate = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                else if (arguments.length == 6)
                    theDate = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                else if (arguments.length == 7)
                    theDate = new JSDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
            }
            return theDate;
        }

        newDate.parse = function (sDate) {
            return JSDate.parse(fixStringDate(sDate));
        }

        return newDate;

    })(Date)

})();