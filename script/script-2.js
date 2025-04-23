$(document).ready(function () {


    var site_url = $('head base').attr('href');


    $(document).on('submit', 'form[data-xhr]', function (event) {
        event.preventDefault();
        var action = $(this).attr('action');
        var method = $(this).attr('method');
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: action,
            type: method,
            dataType: 'json',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function (result) {
                /* İşlem başarılı, dönen sonucu ekrana bastır */
                if (result.s == "error") {
                    var heading = "Unsuccessful";
                } else {
                    var heading = "Successful";
                }
                $.toast({
                    heading: heading,
                    text: result.m,
                    icon: result.s,
                    loader: true,
                    loaderBg: "#9EC600"
                });
                if (result.r != null) {
                    if (result.time == null) {
                        result.time = 3;
                    }
                    /* Yönlendirilecek adres boş değil ise yönlendir */
                    setTimeout(function () {
                        if (result.r != -1) {
                            window.location.href = result.r;
                        }
                        if ('service_name' in result) {
                            var serv_id = result.service_id;
                            var serv_name = result.service_name;
                            $('#service-name-id-' + serv_id).html(serv_name);
                        }
                        if (typeof result.service_toplu_bakiye !== 'undefined') {
                            var bakiyeler = result.service_toplu_bakiye;
                            $.each(JSON.parse(bakiyeler), function (index, value) {
                                $('#service-bakiye-id-' + index).html(value);
                            });
                        }

                    }, result.time * 1000);
                    $('#modalDivDuzenle').modal('hide');
                    if (action.indexOf("modalsave") > -1) {
                        var service_id = action.split('/');
                        service_id = service_id[6].split('?');
                        service_id = service_id[0];
                        $.ajax({
                            url: window.base_url2+"/admin/services/getServiceInfo/"+service_id,
                            type: method,
                            dataType: 'json',
                            cache: false,
                            contentType: false,
                            processData: false
                        }).done(function(result2){
                             $('#service-name-id-' + service_id).html(result2.name);
                             $('#service-api-id-' + service_id).html(result2.api_id);
                             $('#service-min-id-' + service_id).html(result2.min);
                             $('#service-max-id-' + service_id).html(result2.max);
                             $('#service-bakiye-id-' + service_id).html(result2.price+"₺");
                             //$('input[name="service['+service_id+']"]').parent("div").child('small').html('#'+result2.api_id);
                        })
                    }
                }

            })
            .fail(function () {
                /* Ajax işlemi başarısız, hata bas */
                $.toast({
                    heading: 'Error!',
                    text: 'Request failed',
                    icon: 'error',
                    loader: true,
                    loaderBg: "#9EC600"
                });
            })
    });


    $("#delete-row").click(function () {
        var action = $(this).attr("data-url");
        swal({
            title: "Are you sure you want to delete it?",
            text: "If you confirm this content will be deleted, you may not be able to bring it back.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["Close", "Yes, I am sure!"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        url: action,
                        type: "GET",
                        dataType: "json",
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                        .done(function (result) {
                            if (result.s == "error") {
                                var heading = "Unsuccessful";
                            } else {
                                var heading = "Successful";
                            }
                            $.toast({
                                heading: heading,
                                text: result.m,
                                icon: result.s,
                                loader: true,
                                loaderBg: "#9EC600"
                            });
                            if (result.r != null) {
                                if (result.time == null) {
                                    result.time = 3;
                                }
                                setTimeout(function () {
                                    window.location.href = result.r;
                                }, result.time * 1000);
                            }
                        })
                        .fail(function () {
                            $.toast({
                                heading: "Unsuccessful",
                                text: "Request failed",
                                icon: "error",
                                loader: true,
                                loaderBg: "#9EC600"
                            });
                        });
                    /* İçerik silinmesi onaylandı */
                } else {
                    $.toast({
                        heading: "Unsuccessful",
                        text: "Deletion request denied",
                        icon: "error",
                        loader: true,
                        loaderBg: "#9EC600"
                    });
                }
            });
    });

});
