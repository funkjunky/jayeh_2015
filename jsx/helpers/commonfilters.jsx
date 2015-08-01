var CommonFilters = {
    byAnyElementSubstring: function(string, caseSensitive) {
        function caseSensitiveSubset(set, subset) {
            if(typeof subset !== 'string' || subset == '')
                return true;
            else
                //if it isn't a string, then we filter out the item automatically
                return typeof set === 'string' && set.indexOf(subset) != -1;
        }
        function caseInsensitiveSubset(set, subset) {
            if(typeof subset !== 'string' || subset == '')
                return true;
            else
                return typeof set === 'string' && set.toUpperCase().indexOf(subset.toUpperCase()) != -1;
        }
        var isSubset = (caseSensitive) ? caseSensitiveSubset : caseInsensitiveSubset;

        return function(item) {
            for(var key in item)
                if(isSubset(item[key], string))
                    return true;

            return false;
        };
    },
};

module.exports = CommonFilters;
