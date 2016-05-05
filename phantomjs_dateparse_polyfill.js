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

        function dateCtorDecorator() {
            var newDate;
            if (arguments.length === 1 && typeof arguments[0] === "string") {
                newDate = new JSDate(fixStringDate(arguments[0]))
            } else {
                if (arguments.length == 1) {
                    newDate = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))
                }
                    
            }
            return newDate;
        }

        dateCtorDecorator.parse = function (sDate) {
            return JSDate.parse(fixStringDate(sDate));
        }

        return dateCtorDecorator;

    })(Date)

})();
