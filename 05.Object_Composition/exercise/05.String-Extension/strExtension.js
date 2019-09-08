;(() => {
    String.prototype.ensureStart = function (str) {
        return this.startsWith(str) ? this.toString() : str + this;
    };

    String.prototype.ensureEnd = function (str) {
        return this.endsWith(str) ? this.toString() : this + str;
    };

    String.prototype.isEmpty = function () {
        return this.length === 0;
    };

    String.prototype.truncate = function (n) {

        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.length <= n) {
            return this.toString;
        }

        let index = this.toString()
            .substr(0, n - 2)
            .lastIndexOf(' ');

        return index === -1 ? `${this.substr(0, n - 3)}...` : `${this.substr(0, index)}...`;
    };

    String.format = function (str, ...params) {
        params.forEach((p, i) => (str = str.replace(`{${i}}`, p)));
        return str.toString();
    };
})();