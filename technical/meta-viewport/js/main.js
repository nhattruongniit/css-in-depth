  $(document).ready(function() {
      var $hWindow = $(window).height();
      var $banner = $(".banner");
      $banner.css("height", $hWindow);
      $(window).on("resize", function() {
          var $hWindowResize = $(window).height();
          $banner.css("height", $hWindowResize);
      });

      $(".screen__game > img").on("click", function() {
          var _seft = $(this);
          var imgBig = _seft.attr("data-src");
          $('.popup--images > img').attr("src", imgBig);
          $('.blur').show();
          $('.popup').show();
      });

      $(".blur, .popup").on("click", function() {
          $(".blur, .popup").hide();
      });

      var urlBrowse = window.location.href.split('=');
      if (urlBrowse[1]) {
          $('#messageSent').show();
          $('body, html').scrollTop($(".form_contact").offset().top);
      }

      // validate form send email 
      function validEmail(fieldId, classError, messageError) {
          var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          var inputEmail = $('#' + fieldId).val();

          if (mailformat.test(inputEmail)) {
              $('.' + classError).hide();
              return true;
          } else {
              if (messageError !== undefined) {
                  $('.' + classError).text(messageError);
              }
              $('.' + classError).show();
              return false;
          }
      }

      function isNotNumber(fieldId, classError) {
          var pattern = /^([0-9\(\)\/\+ \-]*)$/;
          var inputValue = $('#' + fieldId).val();

          if (inputValue === '') {
              $('.' + classError).hide();
              return false;
          }

          if (inputValue.search(pattern) === -1) {
              $('.' + classError).show();
              return true;
          } else {
              $('.' + classError).hide();
              return false;
          }
      }


      function isEmpty(fieldId, classError, messageError) {
          if ($('#' + fieldId).val() == '' || $.trim($('#' + fieldId).val()) == '') {
              if (messageError !== undefined) {
                  $('.' + classError).text(messageError);
              }
              $('.' + classError).show();
              return true;
          } else {
              $('.' + classError).hide();
              return false;
          }
      }

      function checkSendMail() {


          var checkOk = true;

          //check company name
          if (isEmpty('companyName', 'company-name')) {
              checkOk = false;
          }

          if (isEmpty('personCharge', 'person-charge')) {
              checkOk = false;
          }

          //check email
          if (isEmpty('mailAddress', 'mail-required', "Email doesn't blank")) { //メールアドレスを記載してください
              checkOk = false;
          }
          var inputEmail = $('#mailAddress').val();
          if (inputEmail && validEmail('mailAddress', 'mail-required', "Email doesn't correct format") === false) {
              checkOk = false;
          }

          //check textarea
          if (isEmpty('message', 'message')) {
              checkOk = false;
          }

          return checkOk;
      }

      $("#frm-send-mail").submit(function(event) {
          return checkSendMail();
          // $('#messageSent').show();
          // $('html, body').animate({
          //     scrollTop: $(".form_contact").offset().top
          // }, 1000);
      });

      //   $("form input[type='text'], textarea").on('blur', function() {
      //       return checkSendMail();
      //   });


  })