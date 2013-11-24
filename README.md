PhantomJS-DatePolyfill
======================

A polyfill for PhantomJS 1.9 that enables parsing of date strings of the form YYYY MMM D hh:mm:ss either by Date.parse or the Date constructor.

CAUTION: To enable overriding the constructor of the build-in Date class, this polyfill uses some techniques with may run afoul of the ECMA Script spec and hence may not continue to work in future releases nor in all browsers.  In my defence, this script is intended to fix a specific problem in one browser version only, which it appears to do successfully.  (See the tests)

It appears to be idempotent in the current versions of Chrome and FireFox but they parse this date format correctly anyway.  

USE AT YOUR OWN RISK.

Modified MIT License.
