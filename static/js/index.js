hz_to_str = function(hz) {
  if (hz >= 1000000000) {
    return ((hz/1000000000).toString()+"GHz");
  }
  else if (hz >= 1000000) {
    return ((hz/1000000).toString()+"MHz");
  }
  else if (hz >= 1000) {
    return ((hz/1000).toString()+"KHz");
  }
  else {
    return (hz.toString()+"Hz");
  }
}

get_mcu_json = function(mcu) {
  var response = $.ajax({
           type: 'GET',
           url: "/mcu_info/" + mcu + ".json",
           async: false,
           dataType: 'json',
           done: function(dat) {
             return dat;
           }
         });
  return response.responseJSON;
};

update_mcu_display = function(mcu) {
  var cur_mcu_json = get_mcu_json(mcu);
  var mcu_html = "<h1 class=\"mcu_title\">" + mcu + "</h1><hr>";
  // Check if a valid JSON was loaded.
  if (cur_mcu_json['mcu_core']) {
    // Fill in the various attributes.
    // TODO: Use a template file...
    mcu_html += "<h2 class=\"mcu_core_title\">" + cur_mcu_json['mcu_core'] + ", " + (cur_mcu_json['max_speed']/1000000).toString() + "MHz</h2><hr>";
    // Chip package.
    mcu_html += "<div class=\"mcu_package_display\"><h3 class=\"mcu_package_title\">" + cur_mcu_json['package'] + "</h3></div><hr>";
    // Memories.
    mcu_html += "<div class=\"mcu_memories_display\"><h3 class=\"mcu_memories_title\">Memories:</h3><table class=\"mcu_memories_table\"><tr class=\"memories_title_row\"><td class=\"mem_name_title_cell\">Memory</td><td class=\"mem_type_title_cell\">Type</td><td class=\"mem_space_title_cell\">Space</td></tr>";
    for (var key in cur_mcu_json['memories']) {
      mcu_html += "<tr class=\"memories_value_row\"><td class=\"mem_name_value_cell\">"+cur_mcu_json['memories'][key]['name']+"</td><td class=\"mem_type_value_cell\">";
      if (cur_mcu_json['memories'][key]['type'] == 'V') {
        mcu_html += "Volatile";
      }
      else {
        mcu_html += "Non-Volatile";
      }
      mcu_html += "</td><td class=\"mem_space_value_cell\">"+cur_mcu_json['memories'][key]['space']+"</td></tr>";
    }
    mcu_html += "</table></div><hr>";
    // Clock sources.
    mcu_html += "<div class=\"mcu_clocks_display\"><h3 class=\"mcu_clocks_title\">Clock Sources:</h3><table class=\"mcu_clocks_table\"><tr class=\"clocks_title_row\"><td class=\"clock_src_title_cell\">Source</td><td class=\"clock_type_title_cell\">Type</td><td class=\"clock_speed_title_cell\">Speed</td></tr>";
    for (var key in cur_mcu_json['clocks']) {
      mcu_html += "<tr class=\"clocks_value_row\"><td class=\"clock_src_value_cell\">"+cur_mcu_json['clocks'][key]["name"]+"</td><td class=\"clock_type_value_cell\">"+cur_mcu_json['clocks'][key]["type"]+"</td>";
      if (cur_mcu_json['clocks'][key]["speed"]) {
        mcu_html += "<td class=\"clock_speed_value_cell\">"+hz_to_str(cur_mcu_json['clocks'][key]["speed"])+"</td></tr>";
      }
      else {
        mcu_html += "<td class=\"clock_speed_value_cell\">"+hz_to_str(cur_mcu_json['clocks'][key]["min_speed"])+" - "+hz_to_str(cur_mcu_json['clocks'][key]["max_speed"])+"</td></tr>";
      }
    }
    mcu_html += "</table></div><hr>";
  }
  else {
    mcu_html += "<h2 class=\"mcu_error_msg\">Oops, error.</h2>";
  }
  document.getElementById("mcu_display").innerHTML = mcu_html;
};
