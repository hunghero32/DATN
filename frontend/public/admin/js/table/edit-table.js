
(function (jQuery) {
  jQuery(document).ready(function () {
    /*---------------------------------------------------------------------
     Editable Table 
     -----------------------------------------------------------------------*/
    const $tableID = $("#edit-table"),
      $BTN = $("#export-btn"),
      $EXPORT = $("#export"),
      newTr =
        '\n<tr class="hide">\n  <td class="pt-3-half" contenteditable="true">Example</td>\n  <td class="pt-3-half" contenteditable="true">Example</td>\n  <td class="pt-3-half" contenteditable="true">Example</td>\n  <td class="pt-3-half" contenteditable="true">Example</td>\n  <td class="pt-3-half" contenteditable="true">Example</td>\n  <td class="pt-3-half">\n    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>\n    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>\n  </td>\n  <td>\n    <span class="table-remove"><button type="button" class="btn btn-danger-subtle btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>\n  </td>\n</tr>';
    $(".table-add").on("click", "i", () => {
      const e = $tableID
        .find("tbody tr")
        .last()
        .clone(!0)
        .removeClass("hide table-line");
      0 === $tableID.find("tbody tr").length && $("tbody").append(newTr),
        $tableID.find("table").append(e);
    }),
      $tableID.on("click", ".table-remove", function () {
        $(this).parents("tr").detach();
      }),
      $tableID.on("click", ".table-up", function () {
        const e = $(this).parents("tr");
        1 !== e.index() && e.prev().before(e.get(0));
      }),
      $tableID.on("click", ".table-down", function () {
        const e = $(this).parents("tr");
        e.next().after(e.get(0));
      }),
      (jQuery.fn.pop = [].pop),
      (jQuery.fn.shift = [].shift),
      $BTN.on("click", () => {
        const e = $tableID.find("tr:not(:hidden)"),
          t = [],
          a = [];
        $(e.shift())
          .find("th:not(:empty)")
          .each(function () {
            t.push($(this).text().toLowerCase());
          }),
          e.each(function () {
            const e = $(this).find("td"),
              n = {};
            t.forEach((t, a) => {
              n[t] = e.eq(a).text();
            }),
              a.push(n);
          }),
          $EXPORT.text(JSON.stringify(a));
      }),
      $(document).ready(function () {
        var e,
          t,
          a,
          n,
          o = 1,
          r = $("fieldset").length;

        function i(e) {
          var t = parseFloat(100 / r) * e;
          (t = t.toFixed()), $(".progress-bar").css("width", t + "%");
        }
        i(o),
          $(".next").click(function () {
            (e = $(this).parent()),
              (t = $(this).parent().next()),
              $("#top-tab-list li")
                .eq($("fieldset").index(t))
                .addClass("active"),
              $("#top-tab-list li").eq($("fieldset").index(e)).addClass("done"),
              t.show(),
              e.animate(
                {
                  opacity: 0,
                },
                {
                  step: function (a) {
                    (n = 1 - a),
                      e.css({
                        display: "none",
                        position: "relative",
                      }),
                      t.css({
                        opacity: n,
                      });
                  },
                  duration: 500,
                }
              ),
              i(++o);
          }),
          $(".previous").click(function () {
            (e = $(this).parent()),
              (a = $(this).parent().prev()),
              $("#top-tab-list li")
                .eq($("fieldset").index(e))
                .removeClass("active"),
              $("#top-tab-list li")
                .eq($("fieldset").index(a))
                .removeClass("done"),
              a.show(),
              e.animate(
                {
                  opacity: 0,
                },
                {
                  step: function (t) {
                    (n = 1 - t),
                      e.css({
                        display: "none",
                        position: "relative",
                      }),
                      a.css({
                        opacity: n,
                      });
                  },
                  duration: 500,
                }
              ),
              i(--o);
          }),
          $(".submit").click(function () {
            return !1;
          });
      }),
      $(document).ready(function () {
        var e = $("div.setup-panel div a"),
          t = $(".setup-content"),
          a = $(".nextBtn");
        t.hide(),
          e.click(function (a) {
            a.preventDefault();
            var n = $($(this).attr("href")),
              o = $(this);
            o.hasClass("disabled") ||
              (e.addClass("active"),
                o.parent().addClass("active"),
                t.hide(),
                n.show(),
                n.find("input:eq(0)").focus());
          }),
          a.click(function () {
            var e = $(this).closest(".setup-content"),
              t = e.attr("id"),
              a = $('div.setup-panel div a[href="#' + t + '"]')
                .parent()
                .next()
                .children("a"),
              n = e.find(
                "input[type='text'],input[type='email'],input[type='password'],input[type='url'],textarea"
              ),
              o = !0;
            $(".form-group").removeClass("has-error");
            for (var r = 0; r < n.length; r++)
              n[r].validity.valid ||
                ((o = !1),
                  $(n[r]).closest(".form-group").addClass("has-error"));
            o && a.removeAttr("disabled").trigger("click");
          }),
          $("div.setup-panel div a.active").trigger("click");
      }),
      $(document).ready(function () {
        var e,
          t,
          a,
          n,
          o = 1,
          r = $("fieldset").length;
        function i(e) {
          var t = parseFloat(100 / r) * e;
          (t = t.toFixed()), $(".progress-bar").css("width", t + "%");
        }
        i(o),
          $(".next").click(function () {
            (e = $(this).parent()),
              (t = $(this).parent().next()),
              $("#top-tabbar-vertical li")
                .eq($("fieldset").index(t))
                .addClass("active"),
              t.show(),
              e.animate(
                {
                  opacity: 0,
                },
                {
                  step: function (a) {
                    (n = 1 - a),
                      e.css({
                        display: "none",
                        position: "relative",
                      }),
                      t.css({
                        opacity: n,
                      });
                  },
                  duration: 500,
                }
              ),
              i(++o);
          }),
          $(".previous").click(function () {
            (e = $(this).parent()),
              (a = $(this).parent().prev()),
              $("#top-tabbar-vertical li")
                .eq($("fieldset").index(e))
                .removeClass("active"),
              a.show(),
              e.animate(
                {
                  opacity: 0,
                },
                {
                  step: function (t) {
                    (n = 1 - t),
                      e.css({
                        display: "none",
                        position: "relative",
                      }),
                      a.css({
                        opacity: n,
                      });
                  },
                  duration: 500,
                }
              ),
              i(--o);
          }),
          $(".submit").click(function () {
            return !1;
          });
      }),
      $(document).ready(function () {
        $(".file-upload").on("change", function () {
          !(function (e) {
            if (e.files && e.files[0]) {
              var t = new FileReader();
              (t.onload = function (e) {
                $(".profile-pic").attr("src", e.target.result);
              }),
                t.readAsDataURL(e.files[0]);
            }
          })(this);
        }),
          $(".upload-button").on("click", function () {
            $(".file-upload").click();
          });
      }),
      $(function () {
        function e(e) {
          return (e / 100) * 360;
        }
        $(".progress-round").each(function () {
          var t = $(this).attr("data-value"),
            a = $(this).find(".progress-left .progress-bar"),
            n = $(this).find(".progress-right .progress-bar");
          t > 0 &&
            (t <= 50
              ? n.css("transform", "rotate(" + e(t) + "deg)")
              : (n.css("transform", "rotate(180deg)"),
                a.css("transform", "rotate(" + e(t - 50) + "deg)")));
        });
      });
  })
})(jQuery)