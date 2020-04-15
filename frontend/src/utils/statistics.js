class Statistics {
    static percentageOfRT(array_elements) {
        var result = "";
        var countRT = 0;
        if (array_elements.length > 0) {
            array_elements.forEach(element => {
                if (element.text.includes("RT @"))
                    countRT++;
            });
            result = Math.round((countRT / array_elements.length) * 100) + "% are retweet.";
        }
        return result;
    }

    static countByDate(array_elements) {
        var repeated = [];
        array_elements.sort();
        var current = null;
        var cnt = 0;
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] !== current) {
                if (cnt > 0) {
                    repeated.push(((cnt / array_elements.length) * 100) + '% of tweets happned in ' + current);
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            repeated.push(((cnt / array_elements.length) * 100) + '% of tweets happned in ' + current);
        }
        return repeated;
    }
}

export default Statistics;