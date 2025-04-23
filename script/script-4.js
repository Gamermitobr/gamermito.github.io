function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function UserPassword() {
    $("#user_password").val(generatePassword())
}


$(document).ready(function () {

    $('#ticket_talep').click(function () {
        var saglayici = $('#ajax_talep_site').val();
        var key = $('#ajax_talep_site').find(':selected').data('key');
        $.post(saglayici, {
            key: key,
            action: 'addTicket',
            subject: $('#t_baslik').val(),
            message: " "
        }, function (data) {
            if (data.status == 202) {
                $.post(window.base_url + "admin/tickets/saglayici_ajax", {
                    ticket_id: data.ticket_id,
                    current_id: $('#t_id').val(),
                    saglayici_adres: $('#ajax_talep_site').val()
                }, function (data) {
                    if (data.status == 'success') {
                        $.toast({
                            heading: "Talep Oluşturuldu",
                            text: "Başarıyla " + $('#ajax_talep_site').val() + " Adresinde talep oluşturuldu",
                            icon: "success",
                            loader: true,
                            loaderBg: "#3C763D"
                        });
                    }
                }, 'json')
            }
            console.log(data.ticket_id);
        }, 'json');
    });



    function playSound(filename) {
        var mp3Source = '<source src="' + filename + '.mp3" type="audio/mpeg">';
        var oggSource = '<source src="' + filename + '.ogg" type="audio/ogg">';
        var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3">';
       // document.getElementById("sound").innerHTML = '<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
    }

    var site_url = window.base_url;
    setInterval(function () {
        $.post(window.base_url + 'admin/tickets/ajax', {
            ticket: 1,
        }, function (data) {
            if (data.support_new) {
                playSound('/assets/yeni_admin/bing');
            }
        }, 'json');

    }, 30000);
    $("#serviceList").click(function () {
        $("#serviceListContent").html('<center><div class="modal-body"><div class="fa-3x"><i border="0" alt="loading" class="fas fa-spinner fa-spin"></i></div></div></center>');
        var href = $(this).attr("data-href");
        var active = $(this).attr("data-active");
        $.post(site_url + href, {active: active}, function (data) {
            $("#serviceListContent").html(data);
        });
    });

    $('#modalDiv').on('show.bs.modal', function (e) {
        $("#modalContent").html('<center><div class="modal-body"><div class="fa-3x"><i border="0" alt="loading" class="fas fa-spinner fa-spin"></i></div></div></center>');
        $.post(site_url + 'admin/ajax_data', {
            action: $(e.relatedTarget).data('action'),
            id: $(e.relatedTarget).data('id')
        }, function (data) {
            $("#modalTitle").html(data.title);
            $("#modalContent").html(data.content);
            $(".datetime").datepicker({
                format: "dd/mm/yyyy",
                language: "tr",
                startDate: new Date(),
            }).on('change', function (ev) {
                $(".datetime").datepicker('hide');
            });
        }, 'json');
    });

    $('#defaultCheck1').change(function () {

        if ($(this).is(':checked')) {
            var id = $('form').attr('data-id');
            $.post(site_url + 'admin/tickets/read/' + id, {
                kilit: 'on',
                id: id
            }, function (data) {
                $.toast({
                    heading: "Talep",
                    text: "Başarıyla Kilitlendi",
                    icon: "success",
                    loader: true,
                    loaderBg: "#3C763D"
                });
            }, 'json');
        } else {
            var id = $('form').attr('data-id');
            $.post(site_url + 'admin/tickets/read/' + id, {
                kilit: 'off',
                id: id
            }, function (data) {
                $.toast({
                    heading: "Talep",
                    text: "Başarıyla Kilidi Açıldı",
                    icon: "success",
                    loader: true,
                    loaderBg: "#3C763D"
                });
            }, 'json');
        }
    });
    $('#talep_degis').on('select2:select', function (e) {
        var data = e.params.data.id;
        var id = $('form').attr('data-id');
        $.post(site_url + 'admin/tickets/read/' + id, {
            durum: data,
            id: id
        }, function (data) {
            $.toast({
                heading: "Talep Durumu",
                text: "Başarıyla Düzenlendi",
                icon: "success",
                loader: true,
                loaderBg: "#3C763D"
            });
        }, 'json');
    });
    $('#modalDiv').on('hidden.bs.modal', function () {
        $("#modalTitle").html('');
        $("#modalContent").html('');
    });

    $('#subsDiv').on('show.bs.modal', function (e) {
        $.post(site_url + 'admin/ajax_data', {
            action: $(e.relatedTarget).data('action'),
            id: $(e.relatedTarget).data('id')
        }, function (data) {
            $("#subsTitle").html(data.title);
            $("#subsContent").html(data.content);
            $(".datetime").datepicker({
                format: "dd/mm/yyyy",
                language: "tr",
                startDate: new Date(),
            }).on('change', function (ev) {
                $(".datetime").datepicker('hide');
            });
        }, 'json');
    });

    $('[id^="delete_rate_button-"]').click(function () {
        var id = $(this).attr("data-service");
        $("#rate-" + id).val("");
        $('#delete_rate_button-' + id).css("visibility", "hidden");
    });

    $('[id^="delete_rate_button-"]').each(function () {
        var id = $(this).attr("data-service");
        var price = $('#rate-' + id).val().length;
        if (price > 0) {
            $("#delete_rate_button-" + id).css("visibility", "visible");
        }
    });

    $('[id^="rate-"]').on('keyup', function () {
        var id = $(this).attr("data-service");
        var price = $('#rate-' + id).val().length;
        if (price > 0) {
            $("#delete_rate_button-" + id).css("visibility", "visible");
        } else {
            $("#delete_rate_button-" + id).css("visibility", "hidden");
        }
    });

    $('[id^="collapedAdd-"]').click(function () {
        var id = $(this).attr("data-category");
        if ($(this).attr("class") == "service-block__collapse-button") {
            $(".Service" + id).hide();
            $(this).addClass(" collapsed");
        } else {
            $(".Service" + id).show();
            $(this).removeClass(" collapsed");
        }
    });

    $('#allServices').click(function () {
        if ($(this).attr("class") == "service-block__hide-all fa fa-compress") {
            $('#allServices').removeClass("fa fa-compress");
            $('#allServices').addClass("fa fa-expand");
            $('[class^="Servicecategory-"]').each(function () {
                $(this).hide();
            });
            $('[id^="collapedAdd-"]').each(function () {
                $(this).addClass(" collapsed");
            });
        } else {
            $('#allServices').removeClass("fa fa-expand");
            $('#allServices').addClass("fa fa-compress");
            $('[class^="Servicecategory-"]').each(function () {
                $(this).show();
            });
            $('[id^="collapedAdd-"]').each(function () {
                $(this).removeClass(" collapsed");
            });
        }
    });

    $("#priceSearch").on('keyup', function () {
        var search = $(this).val();
        var filter = search.toUpperCase();
        var i = 0;
        $('[id^="servicepriceList-"]').each(function () {
            i++;
            var name = $(this).attr("data-name");
            var txtValue = name.textContent || name.innerText;
            if (name.toUpperCase().indexOf(filter) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#priceService").on('keyup', function () {
        var search = $(this).val();
        var filter = search.toUpperCase();
        var i = 0;
        $('[data-id^="service-"]').each(function () {
            var name = $(this).attr("data-service");
            var category = $(this).attr("data-category");
            var txtValue = name.textContent || name.innerText;
            if (name.toUpperCase().indexOf(filter) > -1) {
                $(this).show();
                $(this).attr("id", "serviceshow" + category);
            } else {
                $(this).hide();
                $(this).attr("id", "servicehide");
            }

        });
        $('[id^="Servicecategory-"]').each(function () {
            var id = $(this).attr("data-id");
            var rowCount = $('#servicesTableList > tbody > tr#serviceshow' + id).length;
            if (rowCount == 0) {
                $("#" + id).hide();
            } else {
                $("#" + id).show();
            }
        });
    });
    $(".payment-methods").click(function () {
        if ($(this).attr("data-status") == "aktif") {
            var types = "on";
            var clas = "btn-glycon btn-glycon-danger btn-glycon-module payment-methods";
            var yazi = '<i class="fas fa-times" aria-hidden="true"></i> Pasifleştir';
            var status = "pasif";
        } else {
            var types = "off";
            var clas = "btn-glycon btn-glycon-success btn-glycon-module payment-methods";
            var yazi = '<i class="fas fa-check" aria-hidden="true"></i> Aktifleştir';
            var status = "aktif";
        }
        var id = $(this).attr("data-id");
        var action = $(this).attr("data-url") + "?type=" + types + "&id=" + id;
        $.ajax({
            url: action,
            type: 'GET',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false
        }).done(function (result) {
            if (result == 1) {
                $('[data-toggle="' + id + '"]').removeClass("grey");
            } else {
                $.toast({
                    heading: "Unsuccessful",
                    text: "Operation failed",
                    icon: "error",
                    loader: true,
                    loaderBg: "#9EC600"
                });


            }
        })
            .fail(function () {
                $.toast({
                    heading: "Unsuccessful",
                    text: "Operation failed",
                    icon: "error",
                    loader: true,
                    loaderBg: "#9EC600"
                });
            });
        $(this).attr("class", clas);
        $(this).html(yazi);
        $(this).attr('data-status', status)
    });
    $(".tiny-toggle").tinyToggle({
        onCheck: function () {
            var id = $(this).attr("data-id");
            var action = $(this).attr("data-url") + "?type=on&id=" + id;
            $.ajax({
                url: action,
                type: 'GET',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false
            }).done(function (result) {
                if (result == 1) {
                    $('[data-toggle="' + id + '"]').removeClass("grey");
                } else {
                    $.toast({
                        heading: "Unsuccessful",
                        text: "Operation failed",
                        icon: "error",
                        loader: true,
                        loaderBg: "#9EC600"
                    });
                }
            })
                .fail(function () {
                    $.toast({
                        heading: "Unsuccessful",
                        text: "Operation failed",
                        icon: "error",
                        loader: true,
                        loaderBg: "#9EC600"
                    });
                });
        },
        onUncheck: function () {
            var id = $(this).attr("data-id");
            var action = $(this).attr("data-url") + "?type=off&id=" + id;
            $.ajax({
                url: action,
                type: 'GET',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false
            }).done(function (result) {
                if (result == 1) {
                    $('[data-toggle="' + id + '"]').addClass("grey");
                } else {
                    $.toast({
                        heading: "Unsuccessful",
                        text: "Operation failed",
                        icon: "error",
                        loader: true,
                        loaderBg: "#9EC600"
                    });
                }
            })
                .fail(function () {
                    $.toast({
                        heading: "Unsuccessful",
                        text: "Operation failed",
                        icon: "error",
                        loader: true,
                        loaderBg: "#9EC600"
                    });
                });
        },
    });
    var provider = $('#provider').val();
    if(window.api_service_s != 1){
    getProviderServices(provider, site_url);
}
    var ikili_servis_select = $("#provider_iki").val();
if(window.api_service_s != 1) {
    getProviderServicesikili(ikili_servis_select, site_url);
}
    $("#provider").change(function () {
        var provider = $(this).val();
        getProviderServices(provider, site_url);
    });
    $("#provider_iki").change(function () {
        var ikili_servis_select = $("#provider_iki").val();
        getProviderServicesikili(ikili_servis_select, site_url);

    });

    getProvider();
    $("#serviceMode").change(function () {
        getProvider();
    });

    getSalePrice();
    $("#saleprice_cal").change(function () {
        getSalePrice();
    });

    getSubscription();
    $("#subscription_package").change(function () {
        getSubscription();
    });

    $('#confirmChange').on('show.bs.modal', function (e) {
        $(this).find('#confirmYes').attr('href', $(e.relatedTarget).data('href'));
    });
    $('#confirmYes').click(function () {
        if ($(this).attr("href") == null) {
            $("#changebulkForm").submit();
            return false;
        }
    });
    $(document).on('click','.bulkorder',function () {
        var status = $(this).attr("data-type");
        $("#bulkStatus").val(status);
        $("#confirmYes").removeAttr('href');
        $("#confirmChange").modal('show');
    });

    $(document).on('click','#checkAll',function () {

        if ($(this).prop('checked') == true) {
            $('.selectOrder').not(this).prop('checked', true);
        } else {
            $('.selectOrder').not(this).prop('checked', false);
        }
        var count = $('.selectOrder').filter(':checked').length;
        $('.countOrders').html(count);
        if (count > 0) {
            $('.countblok').show();
            $('.checkAll-th').addClass("show-action-menu");
        } else {
            $('.countblok').hide();
            $('.checkAll-th').removeClass("show-action-menu");
        }
    });
    $(document).on('click','.selectOrder',function () {
        var count = $('.selectOrder').filter(':checked').length;
        if (count > 0) {
            $('.countblok').show();
            $('.checkAll-th').addClass("show-action-menu");
        } else {
            $('.countblok').hide();
            $('.checkAll-th').removeClass("show-action-menu");
        }
        $('.countOrders').html(count);
    });


});

function getProviderServices(provider, site_url) {
    if (provider == 0) {
        $("#provider_service").hide();
    } else {
        $.post(site_url + '/admin/ajax_data', {action: 'providers_list', provider: provider}).done(function (data) {
            $("#provider_service").show();
            $("#provider_service").html(data);
        }).fail(function () {
            alert("Error!");
        });
    }
}

function getProviderServicesikili(provider, site_url) {
    if (provider == 0) {
        $("#provider_service_iki").hide();
    } else {
        $.post(site_url + '/admin/ajax_data', {action: 'providers_list2', provider: provider}).done(function (data) {
            //$("#provider_service_iki").show();
            $("#provider_service_iki").html(data);
        }).fail(function () {
            alert("Error!");
        });
    }
}

function ikilicheckbox(thiss) {

    if ($(thiss).is(':checked')) {
        $('#ikiislem').show();
        $('#ikili_servis_select').show();
        $('#provider_service_iki').show();
    } else {
        $('#ikiislem').hide();
        $('#ikili_servis_select').hide();
        $('#provider_service_iki').hide();

    }
}

function getProvider() {
    var mode = $("#serviceMode").val();
    if (mode == 1) {
        $("#autoMode").hide();
    } else {
        $("#autoMode").show();
    }
}

function getSalePrice() {
    var type = $("#saleprice_cal").val();
    if (type == "normal") {
        $("#saleprice").hide();
        $("#servicePrice").show();
    } else {
        $("#saleprice").show();
        $("#servicePrice").hide();
    }
}

function getSubscription() {
    var type = $("#subscription_package").val();
    if (type == "11" || type == "12") {
        $("#unlimited").show();
        $("#limited").hide();
    } else {
        $("#unlimited").hide();
        $("#limited").show();
    }

}



