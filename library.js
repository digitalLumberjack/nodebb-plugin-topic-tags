'use strict';

var TopicTags = {};

var ignoredList = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'has', 'once', 'again', 'let', 'lets', 'try'];

TopicTags.init = function(params, callback) {
	callback();
};

TopicTags.addTags = function(data, callback) {
    var tags = data.title.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(" ");
    
    function isInIgnoredList (value) {
        return ignoredList.indexOf(value.toLowerCase()) === -1;
    }
        
    if (data.tags.length === 0) {
        data.tags = tags.filter(isInIgnoredList);
    }
    
    callback(null, data);
};

module.exports = TopicTags;