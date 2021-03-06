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

get_chip_pin_htmls = function(chip_pins, pin_num) {
  // Collect information about the pin.
  var pin_hover_html = "<i><b>Pin #" + (pin_num+1).toString() + ": ";
  var pin_disp_html = "<b>" + (pin_num+1).toString() + ": </b>";
  var pin_info = chip_pins[pin_num];
  if (pin_info) {
    pin_disp_html += pin_info["name"];
    pin_hover_html += pin_info["name"] + "</b><br/>" + pin_info["description"];
    for (var j = 0; j < pin_info["AFs"].length; ++j) {
      if (pin_info["AFs"][j]["display"]) {
        pin_disp_html += " / " + pin_info["AFs"][j]["name"];
      }
      pin_hover_html += "<br/><br/><i><b>" + pin_info["AFs"][j]["name"] + " (" + pin_info["AFs"][j]["type"] + "):</b></i><br/>" + pin_info["AFs"][j]["description"];
    }
  }
  else {
    pin_disp_html += "(No information)";
    pin_hover_html += "(No information)</b></i>";
  }
  return { hover: pin_hover_html, disp: pin_disp_html };
}

get_chip_img_html = function(chip_package, chip_pins) {
  if (chip_package == "TSSOP-20") {
    var chip_img_html = "<div id=\"chip_package_outline\">";
    chip_img_html += "<span id=\"chip_package_left_mid\" class=\"pkg_span_lmts20\"><table class=\"chip_package_pin_table\">";
    for (var i = 0; i < 10; ++i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_lm\"><span class=\"chip_package_pin_lms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<span id=\"chip_package_right_mid\" class=\"pkg_span_rmts20\"><table class=\"chip_package_pin_table\">";
    for (var i = 19; i > 9; --i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_rm\"><span class=\"chip_package_pin_rms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<img id=\"chip_package_img_tag\" class=\"chip_package_img\" src=\"/static/assets/tssop20.svg\" alt=\"Twenty-pin TSSOP package outline and pinout.\"/>";
    chip_img_html += "</div>";
    return chip_img_html;
  }
  else if (chip_package == "QFN-32") {
    var chip_img_html = "<div id=\"chip_package_outline\">";
    chip_img_html += "<span id=\"chip_package_mid_top\" class=\"pkg_span_mtqfn32\"><table id=\"chip_pkg_t_tbl\" class=\"chip_package_pin_table_tb\"><tr class=\"chip_package_pin_t_row\">";
    for (var i = 31; i > 23; --i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<td class=\"chip_package_pin_mt\"><span class=\"chip_package_pin_mts\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td>";
    }
    chip_img_html += "</tr></table></span>";
    chip_img_html += "<span id=\"chip_package_left_mid\" class=\"pkg_span_lmqfn32\"><table class=\"chip_package_pin_table\">";
    for (var i = 0; i < 8; ++i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_lm\"><span class=\"chip_package_pin_lms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<span id=\"chip_package_right_mid\" class=\"pkg_span_rmqfn32\"><table class=\"chip_package_pin_table\">";
    for (var i = 23; i > 15; --i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_rm\"><span class=\"chip_package_pin_rms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<img id=\"chip_package_img_tag\" class=\"chip_package_img\" src=\"/static/assets/qfn32.svg\" alt=\"Thirty-two-pin QFN package outline and pinout.\"/>";
    chip_img_html += "<span id=\"chip_package_mid_bot\" class=\"pkg_span_mbqfn32\"><table id=\"chip_pkg_b_tbl\" class=\"chip_package_pin_table_tb\"><tr class=\"chip_package_pin_b_row\">";
    for (var i = 8; i < 16; ++i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<td class=\"chip_package_pin_mb\"><span class=\"chip_package_pin_mbs\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td>";
    }
    chip_img_html += "</tr></table></span>";
    chip_img_html += "</div>";
    return chip_img_html;
  }
  else if (chip_package == "QFP-32") {
    var chip_img_html = "<div id=\"chip_package_outline\">";
    chip_img_html += "<span id=\"chip_package_mid_top\" class=\"pkg_span_mtqfp32\"><table id=\"chip_pkg_t_tbl\" class=\"chip_package_pin_table_tb\"><tr class=\"chip_package_pin_t_row\">";
    for (var i = 31; i > 23; --i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<td class=\"chip_package_pin_mt\"><span class=\"chip_package_pin_mts\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td>";
    }
    chip_img_html += "</tr></table></span>";
    chip_img_html += "<span id=\"chip_package_left_mid\" class=\"pkg_span_lmqfp32\"><table class=\"chip_package_pin_table\">";
    for (var i = 0; i < 8; ++i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_lm\"><span class=\"chip_package_pin_lms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<span id=\"chip_package_right_mid\" class=\"pkg_span_rmqfp32\"><table class=\"chip_package_pin_table\">";
    for (var i = 23; i > 15; --i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<tr class=\"chip_package_pin_m_row\"><td class=\"chip_package_pin_rm\"><span class=\"chip_package_pin_rms\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td></tr>";
    }
    chip_img_html += "</table></span>";
    chip_img_html += "<img id=\"chip_package_img_tag\" class=\"chip_package_img\" src=\"/static/assets/qfp32.svg\" alt=\"Thirty-two-pin QFP package outline and pinout.\"/>";
    chip_img_html += "<span id=\"chip_package_mid_bot\" class=\"pkg_span_mbqfp32\"><table id=\"chip_pkg_b_tbl\" class=\"chip_package_pin_table_tb\"><tr class=\"chip_package_pin_b_row\">";
    for (var i = 8; i < 16; ++i) {
      var pin_htmls = get_chip_pin_htmls(chip_pins, i);
      chip_img_html += "<td class=\"chip_package_pin_mb\"><span class=\"chip_package_pin_mbs\" data-toggle=\"tooltip\" data-html=\"true\" data-title=\"" + pin_htmls['hover'] + "\">";
      chip_img_html += pin_htmls['disp'];
      chip_img_html += "</span></td>";
    }
    chip_img_html += "</tr></table></span>";
    chip_img_html += "</div>";
    return chip_img_html;
  }
  else {
    return "<div id=\"chip_package_not_found\"><h4 class=\"package_not_found_title\">Could not render chip package - sorry!</h4></div>";
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
    mcu_html += "<h1 class=\"mcu_core_title\">" + cur_mcu_json['mcu_core'] + ", " + (cur_mcu_json['max_speed']/1000000).toString() + "MHz</h1><hr>";
    // Chip package.
    mcu_html += "<div class=\"mcu_package_display\"><h2 class=\"mcu_package_title\">" + cur_mcu_json['package'] + "</h2>";
    mcu_html += get_chip_img_html(cur_mcu_json['package'], cur_mcu_json['pins']);
    mcu_html += "</div><hr>";
    // Memories.
    mcu_html += "<div class=\"mcu_memories_display\"><h2 class=\"mcu_memories_title\">Memories:</h2><table class=\"mcu_memories_table\"><tr class=\"memories_title_row\"><td class=\"mem_name_title_cell\">Memory</td><td class=\"mem_type_title_cell\">Type</td><td class=\"mem_space_title_cell\">Space</td></tr>";
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
    mcu_html += "<div class=\"mcu_clocks_display\"><h2 class=\"mcu_clocks_title\">Clock Sources:</h2><table class=\"mcu_clocks_table\"><tr class=\"clocks_title_row\"><td class=\"clock_src_title_cell\">Source</td><td class=\"clock_type_title_cell\">Type</td><td class=\"clock_speed_title_cell\">Speed</td></tr>";
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
    // Peripherals.
    mcu_html += "<div class=\"mcu_periphs_display\"><h2 class=\"mcu_periphs_title\">Peripherals:</h2><table class=\"mcu_periphs_table\"><tr class=\"periphs_title_row\"><td class=\"periph_name_title_cell\">Peripheral</td><td class=\"periph_type_title_cell\">Type</td><td class=\"periph_count_title_cell\"># Available</td></tr>";
    for (var key in cur_mcu_json['peripherals']) {
      mcu_html += "<tr class=\"periphs_value_row\"><td class=\"periph_name_value_cell\">"+cur_mcu_json['peripherals'][key]['name']+"</td><td class=\"periph_type_value_cell\">"+cur_mcu_json['peripherals'][key]['type']+"</td><td class=\"periph_count_value_cell\">"+cur_mcu_json['peripherals'][key]['count']+"</td></tr>";
    }
    mcu_html += "</table></div><hr>";
  }
  else {
    mcu_html += "<h2 class=\"mcu_error_msg\">Oops, error.</h2>";
  }
  document.getElementById("mcu_display").innerHTML = mcu_html;

  // Update the top/bottom pin row heights.
  var mt_cells = document.getElementsByClassName('chip_package_pin_mts');
  var max_th = 0;
  for (var mt_ind in mt_cells) {
    if (mt_cells[mt_ind].offsetWidth) {
      if (mt_cells[mt_ind].offsetWidth > max_th) {
        max_th = mt_cells[mt_ind].offsetWidth;
      }
    }
  }
  var mb_cells = document.getElementsByClassName('chip_package_pin_mbs');
  var max_bh = 0;
  for (var mb_ind in mb_cells) {
    if (mb_cells[mb_ind].offsetWidth) {
      if (mb_cells[mb_ind].offsetWidth > max_bh) {
        max_bh = mb_cells[mb_ind].offsetWidth;
      }
    }
  }

  var hscale = 1.2;
  if (document.getElementById("chip_pkg_t_tbl")) {
    document.getElementById("chip_pkg_t_tbl").style.height = (max_th*hscale).toString() + "px";
  }
  if (document.getElementById("chip_pkg_b_tbl")) {
    document.getElementById("chip_pkg_b_tbl").style.height = (max_bh*hscale).toString() + "px";
  }

  // Make sure that all Bootstrap tooltips are enabled.
  $('[data-toggle="tooltip"]').tooltip({ boundary: 'window', container: 'body' });
};
