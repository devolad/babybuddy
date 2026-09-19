/**
 * Medication name datalist helpers.
 *
 * When a previously used medication name is chosen from the datalist on the
 * medication add/edit form, prefill dosage, dosage unit, and next-dose
 * interval from data attributes on the matching option.
 */
BabyBuddy.MedicationNameDatalist = (function ($) {
  return {
    init: function () {
      var $input = $("#id_name");
      var list = document.getElementById("medication-name-list");
      if (!$input.length || !list) {
        return;
      }

      var lastApplied = null;

      var applyFromName = function () {
        var value = $input.val();
        if (!value || value === lastApplied) {
          return;
        }

        var option = null;
        for (var i = 0; i < list.options.length; i++) {
          if (list.options[i].value === value) {
            option = list.options[i];
            break;
          }
        }
        if (!option) {
          lastApplied = null;
          return;
        }

        lastApplied = value;

        var dosage = option.getAttribute("data-dosage");
        var unit = option.getAttribute("data-dosage-unit");
        var interval = option.getAttribute("data-next-dose-interval");

        if (dosage !== null && dosage !== "") {
          $("#id_dosage").val(dosage);
        }
        if (unit) {
          var $unit = $('input[name="dosage_unit"][value="' + unit + '"]');
          if ($unit.length) {
            $unit.prop("checked", true);
          }
        }
        if (interval !== null && interval !== "") {
          $("#id_next_dose_interval").val(interval);
        }
      };

      $input.on("change", applyFromName);
      $input.on("input", applyFromName);
    },
  };
})(jQuery);

$(function () {
  BabyBuddy.MedicationNameDatalist.init();
});
