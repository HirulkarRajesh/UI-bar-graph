(function ($) {

  $.fn.generateChart = function (options) {

    // Default options
    var settings = $.extend({
      name: 'chart',
      color: 'orange',
      xmaxValue: 100,
      barColor: "green",
      width: 500,
      height: 500,
      data: []
    }, options);



    ///check minimum width and height provide in options
    if (settings.height == 0) {
      this.css("height", "100px");
      setErrorMsg($(this), "Height of container should not be 0  ", 0);
      return;
    } else {
      this.css("height", settings.height + "px");
    }
    if (settings.width == 0) {
      this.css("width", "100px");
      setErrorMsg($(this), "Width of container should not be 0 ", 0);
      return;
    } else {
      this.css("width", settings.width + "px");
    }


    /// Generate base UI for graph
    this.empty();

    var base_str = '<div class="xaxis">';
    base_str += '<div class="xrage">100</div>';
    base_str += '<div class="xrage">90</div>';
    base_str += '<div class="xrage">80</div>';
    base_str += '<div class="xrage">70</div>';
    base_str += '<div class="xrage">60</div>';
    base_str += '<div class="xrage">50</div>';
    base_str += '<div class="xrage">40</div>';
    base_str += '<div class="xrage">30</div>';
    base_str += '<div class="xrage">20</div>';
    base_str += '<div class="xrage">10</div>';
    base_str += '</div>';

    base_str += '<div class="grapharea">';
    base_str += '<div class="bar" style="height:49%;margin-left: 10px;width: 30px;">49</div>';
    base_str += '<div class="bar" style="height:8%;margin-left: 50px;width: 30px;">8</div>';
    base_str += '<div class="bar" style="height:23%;margin-left: 90px;width: 30px;">23</div>';
    base_str += '<div class="bar" style="height:57%;margin-left: 130px;width: 30px;">57</div>';
    base_str += '<div class="bar" style="height:94%;margin-left: 170px;width: 30px;">94</div>';
    base_str += '<div class="bar" style="height:78%;margin-left: 210px;width: 30px;">78</div>';
    base_str += '<div class="bar" style="height:94%;margin-left: 250px;width: 30px;">94</div>';
    base_str += '<div class="bar" style="height:54%;margin-left: 290px;width: 30px;">54</div>';
    base_str += '<div class="bar" style="height:75%;margin-left: 330px;width: 30px;">75</div>';
    base_str += '<div class="bar" style="height:63%;margin-left: 370px;width: 30px;">63</div>';
    base_str += '</div>';

    base_str += '<div class="yaxis">';
    base_str += '<div class="chartName" style="">' + settings.name + '</div>';
    base_str += '</div>';
    this.append(base_str);
    ///Read Json object or get data pass by user
    if (settings.data.length > 0) {
      var json_obj = {
        "data": settings.data
      }
    }

    var str = "";
    if (json_obj) {
      /// Calculate bar size and width and geneate bar from given data

      var graph_area = $('.grapharea').outerWidth();
      if (graph_area > 0) {
        var main_block = (graph_area / json_obj.data.length);
        var diff = parseInt(main_block * 25 / 100);
        var bar = parseInt(main_block - diff);

        var margin = 0;
        for (var i = 0; i < json_obj.data.length; i++) {
          if (i == 0) {
            margin = margin + diff;
          } else {
            margin = margin + main_block;
          }

          str += '<div class="bar" title="data:' + json_obj.data[i] + '" style="height:' + json_obj.data[i] + '%;margin-left: ' + margin + 'px;width: ' + bar + 'px;background-color: ' + settings.barColor + ';">' + json_obj.data[i] + '</div>';
        }
        $('.grapharea').empty();
        $('.grapharea').append(str);
      } else {
        ///return if have problem with grapharea element.
        setErrorMsg($('.grapharea'), "No records found.", 1);
      }



    } else {
      ///return if not data found or provide empty data.
      setErrorMsg($('.grapharea'), "No records found.", 1);
    }



    return this;

  };

}(jQuery));

///Private functions
///function used for set error messages.
function setErrorMsg(self, msg, type) {
  $(self).empty();
  if (type == 0) {
    $(self).append('<div >' + msg + '</div>');
  } else if (type == 1) {
    $(self).append('<div class="error">' + msg + '</div>');
  }
  else {

  }

}

