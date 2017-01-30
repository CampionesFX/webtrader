/**
 * Created by Arnab Karmakar on 1/16/16.
 */
STDDEV = function(data, options, indicators) {

    if (_.isUndefined(options.appliedTo)) {
        options.appliedTo = indicators.CLOSE;
    }
    IndicatorBase.call(this, data, options, indicators);
    this.sma = new SMA(data, options, indicators);
    this.priceData = [];

    /*
     * Formula -
     // Standard Deviation :
     // 	1-Calculate the average (mean) price for the number of periods or observations.
     // 	2-Determine each period's deviation (close less average price).
     // 	3-Square each period's deviation.
     // 	4-Sum the squared deviations.
     // 	5-Divide this sum by the number of observations.
     // 	6-The standard deviation is then equal to the square root of that number.
     */

    //this is not great way of doing it
    this.precision = guessDigits(_.map(data.slice(0, 10), function(f) { return f.close; })) || 4;

    this._calculate = function(data, index, ma) {
        var sum = 0.0;
        for (var i = this.options.period - 1; i >= 0; i--) {
            var price = indicators.getIndicatorOrPriceValue(data[index - i], this.options.appliedTo);
            sum += Math.pow(price - ma, 2);
        }
        return Math.sqrt(sum / this.options.period);
    };
    
    for (var index = 0; index < data.length; index++)
    {
        if (index >= options.period) {
            var ma = this.sma.indicatorData[index].value;
            var stddev = this._calculate(data, index, ma);
            this.indicatorData.push({
                time: data[index].time, value: toFixed(stddev, this.precision)
            });
        }
        else {
            this.indicatorData.push({ time : data[index].time, value : 0.0 });
        }
        this.priceData.push(data[index]);
    }
};

STDDEV.prototype = Object.create(IndicatorBase.prototype);
STDDEV.prototype.constructor = STDDEV;

/**
 * @param data
 * @returns {*[]}
 */
STDDEV.prototype.addPoint = function(data) {
    this.priceData.push(data);
    var ma = this.sma.addPoint(data)[0].value;
    var index = this.priceData.length - 1;
    var stddev = this._calculate(this.priceData, index, ma);
    this.indicatorData.push({
        time: data.time,
        value: stddev
    });
    return [{
        id : this.uniqueID,
        value : stddev
    }];
};

/**
 * @param data
 * @returns {*[]}
 */
STDDEV.prototype.update = function(data) {
    var index = this.priceData.length - 1;
    this.priceData[index].open  = data.open;
    this.priceData[index].high  = data.high;
    this.priceData[index].low   = data.low;
    this.priceData[index].close = data.close;
    var ma = this.sma.update(data)[0].value;
    var stddev = this._calculate(this.priceData, index, ma);
    this.indicatorData[this.indicatorData.length - 1].value = stddev;
    return [{
        id : this.uniqueID,
        value : stddev
    }];
};

/**
 * @returns {string}
 */
STDDEV.prototype.toString = function() {
    return 'STDDEV (' + this.options.period + ')';
};

STDDEV.prototype.buildSeriesAndAxisConfFromData = function(indicatorMetadata) {
    var confObjects = IndicatorBase.prototype.buildSeriesAndAxisConfFromData.call(this, indicatorMetadata);
    confObjects.forEach(function(confObject) {
        confObject.axisConf.title.x = 30+ this.toString().length * 7.5;
    });
    return confObjects;
};
