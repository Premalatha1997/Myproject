
(function () {
    'use strict';


    var app = angular.module('ProsolApp', ['cgBusy', 'angular.filter']);

    app.controller('pvdataController', function ($scope, $http, $timeout, $window, $filter, $location) {



        $("#txtFrom").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $scope.Fromdate = $('#txtFrom').val();
                var dt = new Date(selected);
                dt.setDate(dt.getDate());
                $("#txtTo").datepicker("option", "minDate", dt);
                // $scope.Todate = $('#txtTo').val();
            }
        });

        $("#txtFrom1").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $scope.Fromdate = $('#txtFrom1').val();
                var dt = new Date(selected);
                dt.setDate(dt.getDate());
                $("#txtTo").datepicker("option", "minDate", dt);
                // $scope.Todate = $('#txtTo').val();
            }
        });

        $("#txtFrom2").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $scope.Fromdate = $('#txtFrom2').val();
                var dt = new Date(selected);
                dt.setDate(dt.getDate());
                $("#txtTo").datepicker("option", "minDate", dt);
                // $scope.Todate = $('#txtTo').val();
            }
        });

        //  $scope.UserDataqq = @Html.Raw(Json.Encode(Model));
        $scope.desctab = "active";
        $scope.desctab1 = "active";
        //  $scope.ssCode = null;



        $scope.checkshort = function (index) {

            if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined) {
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/getVendorAbbrForShortDesc?mfr=' + $scope.rows[index].Name
                }).success(function (response) {

                    if (response != '' && response != false && response != 'false') {
                        $scope.rows[index].shortmfr = response.ShortDescName;
                    }
                    else {
                        $scope.rows[index].shortmfr = "";
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });


                var i = 0;
                angular.forEach($scope.rows, function (val, key) {
                    if (i === index) {
                        if (val.s != 0) {
                            val.s = '1';
                        }
                        else {
                            val.s = '0';
                        }
                    }
                    else {
                        val.s = '0';
                    }
                    i++;
                });


            } else {
                $scope.rows[index].redname = "red";
                $scope.rows[index].s = '0';
            }


        };




        $scope.checklong = function (index) {
            if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined) {
                var tst = $scope.rows[index].l;
                if (tst != 0) {
                    $scope.rows[index].l = '1';
                }
                else {
                    $scope.rows[index].l = '1';
                }
            } else {
                $scope.rows[index].redname = "red";
                $scope.rows[index].l = '1';
            }
        };


        $scope.checkvendortype = function (index) {
            if ($scope.rows[index].Type != "" && $scope.rows[index].Type != null && $scope.rows[index].Type != undefined) {
                $scope.rows[index].red = "";
            }
            else {
                $scope.rows[index].Name = "";
                $scope.rows[index].red = "red";
            }
        };

        $scope.refnochange = function (index) {
            if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined) {
                $scope.rows[index].redrefflag = "";
            }
            else {
                $scope.rows[index].RefNo = "";
                $scope.rows[index].redrefflag = "red";
            }
        };


        $scope.vebdortypechange = function (index) {

            if ($scope.rows[index].Type != "" && $scope.rows[index].Type != null && $scope.rows[index].Type != undefined) {
                var kjkj = 'vendor' + index;
                var name = $window.document.getElementById(kjkj);
                name.focus();
                $scope.rows[index].red = "";
                $scope.rows[index].red = "";
                if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined)
                    $scope.rows[index].redname = "";
                else
                    $scope.rows[index].redname = "";
            }
            else {
                if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined) {
                    $scope.rows[index].redname = "";
                    $scope.rows[index].red = "red";
                }
                else {
                    $scope.rows[index].redname = "";
                    $scope.rows[index].red = "";
                    $scope.rows[index].s = '1';
                    $scope.rows[index].l = '1';

                }

            }

        };



        $scope.refflagchange = function (index) {
            if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined) {
                if ($scope.rows[index].Refflag === "DRAWING & POSITION NUMBER") {
                    $scope.rows[index].placeholder = "Drawing,Position no";
                }
                else {
                    $scope.rows[index].placeholder = "";
                }
                var kjkj = 'refno' + index;
                var name = $window.document.getElementById(kjkj);
                name.focus();
                $scope.rows[index].redrefflag = "";
                $scope.rows[index].redrefflag = "";
                if ($scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined)
                    $scope.rows[index].redrefno = "";
                else
                    $scope.rows[index].redrefno = "";
            }
            else {
                if ($scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined) {
                    $scope.rows[index].redrefno = "";
                    $scope.rows[index].redrefflag = "red";
                }
                else {
                    $scope.rows[index].redrefno = "";
                    $scope.rows[index].redrefflag = "";
                }
            }
        };




        $scope.vendornameblur = function (index) {


            if ($scope.rows[index].Type != "" && $scope.rows[index].Type != null && $scope.rows[index].Type != undefined) {
                $scope.rows[index].red = "";
                if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined)
                    $scope.rows[index].redname = "";
                else
                    $scope.rows[index].redname = "red";
            }
            else {
                if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined) {
                }
                else if ($scope.rows[index].s == '1') {


                    $scope.rows[index].l = '1';

                }
                else {



                    $scope.rows[index].s = '0';
                    $scope.rows[index].l = '1';
                }

                $scope.rows[index].red = "";
                $scope.rows[index].redname = "";
            }

            if ($scope.rows[index].Name != "" && $scope.rows[index].Name != null && $scope.rows[index].Name != undefined && $scope.rows[index].s != '0') {
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/getVendorAbbrForShortDesc?mfr=' + $scope.rows[index].Name
                }).success(function (response) {

                    if (response != '' && response != false && response != 'false') {
                        $scope.rows[index].shortmfr = response.ShortDescName;
                    }
                    else {
                        $scope.rows[index].shortmfr = "";
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });

            }

        };



        $scope.refnoblur = function (index) {


            if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined) {
                $scope.rows[index].redrefflag = "";
                if ($scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined) {

                    if ($scope.rows[index].Refflag === "DRAWING & POSITION NUMBER") {
                        var hh = $scope.rows[index].RefNo;
                        $scope.rows[index].RefNo = hh.replace(/[\s]/g, '');

                        var comma = $scope.rows[index].RefNo.slice(-1);

                        if (comma === ',') {
                            $scope.rows[index].redrefno = "red";
                            //$scope.rows[index].RefNo = $scope.rows[index].RefNo.slice(0, -1);
                        }
                        else {
                            $scope.rows[index].redrefno = "";
                        }
                        if ($scope.rows[index].RefNo.indexOf(',') === -1) {
                            $scope.rows[index].redrefno = "red";
                        }

                        if (($scope.rows[index].RefNo.split(",").length - 1) > 1) {
                            $scope.rows[index].redrefno = "red";
                        }
                    }
                    else
                        $scope.rows[index].redrefno = "";
                }
                else
                    $scope.rows[index].redrefno = "red";
            }
            else {
                $scope.rows[index].redrefflag = "";
                $scope.rows[index].redrefno = "";
            }
        };






        $scope.getItem = function () {

            var url = $location.$$absUrl;
            if (url.indexOf("Catalogue/Index?itemId") !== -1) {

                var arrId = url.split('itemId=');

                $scope.cat = {};

                $http({
                    method: 'GET',
                    url: '/Catalogue/getItem?itemId=' + arrId[1]
                }).success(function (response) {
                    $http({
                        method: 'GET',
                        url: '/GeneralSettings/GetUnspsc?Noun=' + response.Noun + '&Modifier=' + response.Modifier
                    }).success(function (response) {

                        if (response != '') {
                            $scope.Commodities = response;
                            if ($scope.Commodities[0].Commodity != null && response[0].Commodity != "")
                                $scope.cat.Unspsc = $scope.Commodities[0].Commodity;
                            else $scope.cat.Unspsc = $scope.Commodities[0].Class;
                        }
                        else {
                            $scope.Commodities = null;
                        }

                    }).error(function (data, status, headers, config) {
                        // alert("error");

                    });
                    $http({
                        method: 'GET',
                        url: '/GeneralSettings/GetHsn?Noun=' + response.Noun + '&Modifier=' + response.Modifier
                    }).success(function (response) {

                        if (response.HSNID != null) {
                            $scope.HSNID = response.HSNID;
                            $scope.Desc = response.Desc;
                            $scope.HSNShow = true;
                        }
                        else {
                            $scope.HSNShow = false;
                            $scope.HSNID = null;
                            $scope.Desc = null;
                        }

                    });


                    $scope.cat = response;
                    $scope.Equ = response.Equipment;

                    $scope.cat.Maincode = $scope.cat.Maincode;
                    $scope.getSubcode();
                    $scope.cat.Subcode = $scope.cat.Subcode;
                    $scope.getSubsubcode();
                    $scope.cat.Subsubcode = $scope.cat.Subsubcode;


                    var tst = response.Vendorsuppliers;
                    if (tst != null && tst != '') {
                        $scope.rows = response.Vendorsuppliers;
                    } else {
                        $scope.rows = null;

                        $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];
                    }

                    $http({
                        method: 'GET',
                        url: '/Dictionary/GetModifier?Noun=' + $scope.cat.Noun
                    }).success(function (response) {
                        var flg = 0;
                        $scope.Modifiers = response;

                        //angular.forEach($scope.Modifiers, function (obj) {
                        //    if (obj.Modifier == lst.Modifier)
                        //        flg = 1;
                        //});
                        //if (flg == 0) {
                        //    $scope.cat.Modifier = '';

                        //}


                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });

                    ///  $scope.getSimiliar();

                    $http({
                        method: 'GET',
                        url: '/Dictionary/GetNounModifier?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                    }).success(function (response) {
                        if (response != '') {
                            $scope.NM1 = response.One_NounModifier;
                            $scope.Characteristics = response.ALL_NM_Attributes;

                            $http({
                                method: 'GET',
                                url: '/Catalogue/GetUnits'
                            }).success(function (response) {

                                $scope.UOMs = response;

                            }).error(function (data, status, headers, config) {
                                // alert("error");
                            });

                            angular.forEach($scope.Characteristics, function (value1, key1) {

                                angular.forEach($scope.cat.Characteristics, function (value2, key2) {

                                    if (value1.Characteristic === value2.Characteristic) {

                                        value1.Value = value2.Value;
                                        value1.UOM = value2.UOM;

                                    }

                                });
                            });
                        }
                        else {

                            $scope.Characteristics = null;
                            // $('#divcharater').attr('style', 'display: none');
                        }

                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });
            }

        }
        $scope.getItem();
        new jBox('Tooltip', {
            attach: '#showstatus',
            //width: 400,
            //height: 500,                   
            closeButton: true,
            //animation: 'zoomIn',
            theme: 'TooltipBorder',
            trigger: 'click',
            width: 600,
            height: 200,
            adjustTracker: true,
            closeOnClick: 'body',
            closeOnEsc: true,
            animation: 'move',
            //position: {
            //    x: 'center',
            //    y: 'center'
            //},
            outside: 'y',
            content: jQuery('#flowconId')
        });

        $scope.showuserMap = function (itmcode) {

            $http({
                method: 'GET',
                url: '/User/getItemstatusMap?itmcde=' + itmcode
            }).success(function (response) {

                $scope.itemstatusLst = response;

                angular.forEach($scope.itemstatusLst, function (val1, key5) {

                    if (val1.UserName === "") {
                        val1.itemshow = false;
                    }
                    else {
                        val1.itemshow = true;
                    }

                });

            }).error(function (data, status, headers, config) {
                // alert("error");
            });



        }
        $scope.OpenPop = function () {
            $scope.getSimiliar();
            $scope.callpopup();
        }

        $scope.callpopup = function () {


            new jBox('Modal', {
                width: 550,
                height: 500,
                blockScroll: false,
                animation: 'zoomIn',
                draggable: 'title',
                closeButton: true,
                content: jQuery('#simItems'),
                //content: $('#simItems').html(),
                title: 'Click here to drag me around',
                overlay: false,

                reposition: false,
                repositionOnOpen: false,
                position: {
                    x: 'right',
                    y: 'right'
                }
            }).open();


        }
        $scope.showlitpopup = function (inx) {


            new jBox('Modal', {
                width: 550,
                height: 500,
                blockScroll: false,
                animation: 'zoomIn',
                draggable: 'title',
                closeButton: true,
                content: jQuery('#conId' + inx),
                //content: $('#simItems').html(),
                title: 'Click here to drag me around',
                overlay: false,

                reposition: false,
                repositionOnOpen: false,
                position: {
                    x: 'right',
                    y: 'right'
                }
            }).open();


        }

        $scope.NMLoad = function () {
            $scope.cgBusyPromises = $http({
                method: 'GET',
                url: '/Catalogue/GetDBNounList'
            }).success(function (response) {
                $scope.NounList = response;
                $scope.sNoun = "";

            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        }
        $scope.GetUserList = function () {
            $scope.NMLoad();
            $http({
                method: 'GET',
                url: '/Catalogue/showall_user'
            }).success(function (response) {
                $scope.UserList = response;

                //  alert(angular.toJson($scope.UserList))
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

            //$http({
            //    method: 'GET',
            //    url: '/Catalogue/getReleaserList'
            //}).success(function (response) {
            //    $scope.UserList = response;
            //}).error(function (data, status, headers, config) {
            //    // alert("error");
            //});

        };
        $scope.GetUserList();

        $scope.similarDataFill = function (LstObj) {

            angular.forEach($scope.Characteristics, function (value1, key1) {

                angular.forEach(LstObj, function (value2, key2) {

                    if (value1.Characteristic === value2.Characteristic) {

                        value1.Value = value2.Value;
                        value1.UOM = value2.UOM;

                    }

                });
            });
        }
        $scope.checkSimilar = function () {
            // var nonNullList=$scope.LstsimItems;
            angular.forEach($scope.LstsimItems, function (value1, key1) {
                var incr = 0;
                angular.forEach($scope.Characteristics, function (value2, key2) {
                    if (value2.Value != null && value2.Value != "") {
                        angular.forEach(value1.Characteristics, function (value1, key1) {
                            if (value1.Characteristic === value2.Characteristic && value1.Value != null && value1.Value != "") {
                                if (value2.Value == value1.Value)
                                    incr = incr + 1;

                            }
                        });

                    }
                });
                value1.ItemStatus = incr;
            });

        }


        $scope.BindPlant = function () {
            $scope.erp = {};
            $http({
                method: 'GET',
                url: '/Catalogue/getplantCode_Name'
            }).success(function (response) {
                $scope.PlantList = response;
                $scope.erp.Plant = response[0].Plantcode;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindPlant();

        $scope.BindMaster = function () {
            $http({
                method: 'GET',
                url: '/Master/GetMaster'
            }).success(function (response) {
                $scope.MasterList = response;

            }).error(function (data, status, headers, config) {
                // alert("error");
            });
            $http({
                method: 'GET',
                url: '/Master/GetDataList?label=Storage location'
            }).success(function (response) {
                $scope.strloc = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

        };
        $scope.BindMaster();

        //bincode
        $scope.getbincode = function () {
            // $http.get('/Master/getbincode?StorageLocation=' + $scope.erp.StorageLocation 
            $http.get('/Master/getbincode?label= Storage bin' + '&StorageLocation=' + $scope.erp.StorageLocation
             ).success(function (response) {
                 $scope.MasterList1 = response
                 // alert(angular.toJson($scope.getsubgroup));
             }).error(function (data, status, headers, config) {
             });
        };

        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.sts1 = false;
        $scope.checkSubmit = function () {

            $scope.sts1 = false;
            angular.forEach($scope.DataList, function (value, key) {
                if (value.ItemStatus == 1) {
                    $scope.sts1 = true;
                }
            })
        };
        $scope.tempPlace = [];
        $scope.tempRelation = [];
        $scope.ChangeModifier = function () {

            if ($scope.cat.Modifier != null && $scope.cat.Modifier != '') {
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/GetUnspsc?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {

                    if (response != '') {
                        $scope.Commodities = response;
                        if (response[0].Commodity != null && response[0].Commodity != "")
                            $scope.cat.Unspsc = response[0].Commodity;
                        else $scope.cat.Unspsc = response[0].Class;
                    }
                    else {
                        $scope.Commodities = null;
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/GetHsn?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {

                    if (response.HSNID != null) {
                        $scope.HSNID = response.HSNID;
                        $scope.Desc = response.Desc;
                        $scope.HSNShow = true;
                    }
                    else {
                        $scope.HSNShow = false;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                    }

                });
                $http({
                    method: 'GET',
                    url: '/Catalogue/FetchNMRelation?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {

                    if (response != '') {
                        $scope.tempPlace = response;

                    }
                    else {
                        $scope.tempPlace = null;
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });

                //$http({
                //    method: 'GET',
                //    url: '/Catalogue/FetchATTRelation?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                //}).success(function (response) {

                //    if (response != '') {                       
                //        $scope.tempRelation = response;

                //    }
                //    else {
                //        $scope.tempRelation = null;
                //    }

                //}).error(function (data, status, headers, config) {
                //    // alert("error");

                //});

                //Attribute List
                $http({
                    method: 'GET',
                    url: '/Dictionary/GetNounModifier?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {
                    if (response != '') {
                        $scope.NM1 = response.One_NounModifier;
                        $scope.Characteristics = response.ALL_NM_Attributes;

                        $http({
                            method: 'GET',
                            url: '/Catalogue/GetUnits'
                        }).success(function (response) {
                            $scope.UOMs = response;

                        }).error(function (data, status, headers, config) {
                            // alert("error");
                        });

                    }
                    else $scope.Characteristics = null;

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });

            }
            else {

                // $scope.cat = null;
                $scope.Characteristics = null;
                //  $scope.equ = null;
            }
            //   $scope.getSimiliar();           

        };

        $scope.getSimiliar = function () {

            $scope.cgBusyPromises = $http({
                method: 'GET',
                url: '/Catalogue/GetsimItemsList?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
            }).success(function (response) {

                if (response != null) {

                    $scope.LstsimItems = response;
                    // $scope.checkSimilar();


                }
                else {
                    $scope.LstsimItems = null;
                }

            }).error(function (data, status, headers, config) {
                // alert("error");

            });
        }
        $scope.loadUMO = function () {
            $http({
                method: 'GET',
                url: '/GeneralSettings/GetUOMList'
            }).success(function (response) {
                $scope.UOMs = response;

            }).error(function (data, status, headers, config) {
                // alert("error");
            });

        };
        $scope.balanceitems = 0;
        $scope.saveditems = 0;

        //$scope.LoadData = function () {

        //    $http({
        //        method: 'GET',
        //        url: '/Catalogue/GetDataList'
        //    }).success(function (response) {
        //        $scope.DataList = response;


        //        angular.forEach($scope.DataList, function (lst) {
        //            lst.bu = '0';

        //        });


        //        $scope.saveditems = ($filter('filter')($scope.DataList, { 'ItemStatus': '1' })).length;
        //        $scope.balanceitems = ($filter('filter')($scope.DataList, { 'ItemStatus': '0' })).length;


        //        $scope.checkSubmit();
        //    }).error(function (data, status, headers, config) {
        //        // alert("error");
        //    });

        //};
        $scope.LoadDatapv = function () {

            $http({
                method: 'GET',
                url: '/Catalogue/GetDataListpv'
            }).success(function (response) {
                $scope.DataList = response;


                //angular.forEach($scope.DataList, function (lst) {
                //    lst.bu = '0';

                //});


                //$scope.saveditems = ($filter('filter')($scope.DataList, { 'ItemStatus': '1' })).length;
                //$scope.balanceitems = ($filter('filter')($scope.DataList, { 'ItemStatus': '0' })).length;


                $scope.checkSubmit();
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

        };
        $scope.LoadDatapv();

    

        $scope.getList = function (indx, vals) {
            $scope.sepVal = [];
            $scope.temp = [];
            $scope.sepVal1 = [];
            if (vals != null) {
                $scope.temp = vals[0].Values.split(",");
                angular.forEach($scope.temp, function (lst) {
                    $scope.sepVal1.push(lst);

                })
                $scope.sepVal = $scope.sepVal1;
            }

        };

        $scope.GetUserList = function () {

            $http({
                method: 'GET',
                url: '/Catalogue/getReviewerList'
            }).success(function (response) {
                $scope.UserList = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

        };
        // $scope.GetUserList();
      //  $scope.LoadData();
        //Attachment
        $scope.fileList = [];
        $scope.attachment = [];
        $scope.imgList = [];

        $scope.LoadFileData = function (files) {
            $scope.fileList = files;
            //  alert(angular.toJson(files));

        };
        $scope.addImg = function () {

            if ($scope.imgList === null) {
                $scope.imgList = [];
            }

            var ext = $scope.fileList[0].name.substr($scope.fileList[0].name.lastIndexOf('.') + 1);
            //  alert(ext);
            // alert(angular.toJson($scope.cat.Legacy2.toUpperCase()));
            var sdo = $scope.cat.Legacy2.toUpperCase();
            if (!((ext === 'png' || ext === 'PNG') && (sdo.includes('.PNG') || sdo.includes('.JPG') || sdo.includes('.JPEG')))) {
                if (ext === 'png' || ext === 'PNG' || ext === 'pdf' || ext === 'PDF') {
                    // alert(angular.toJson($scope.fileList[0]));
                    $scope.attachment.push($scope.fileList[0]);
                    if (ext === 'pdf' || ext === 'PDF') {
                        $scope.pdfcheck = 1;
                    }


                    var bytes = $scope.fileList[0].size;;
                    var k = 1024; //Or 1 kilo = 1000
                    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
                    var i = Math.floor(Math.log(bytes) / Math.log(k));
                    var size = parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];

                    // alert(angular.toJson($scope.fileList[0]));
                    //  alert(angular.toJson($scope.imgList));
                    // alert(angular.toJson($scope.Title));
                    // alert(angular.toJson(size));
                    //  alert(angular.toJson($scope.attachment[0]));

                    $scope.imgList.push({ "_id": "0", 'Title': $scope.Title == null ? '' : $scope.Title, 'FileName': $scope.fileList[0].name, 'FileSize': size, 'ContentType': $scope.fileList[0].ContentType });

                    //alert(angular.toJson($scope.fileList[0]));
                    //alert(angular.toJson($scope.imgList));
                    //alert(angular.toJson($scope.Title));
                    //alert(angular.toJson(size));
                    //alert(angular.toJson($scope.attachment[0]));

                    $('.fileinput').fileinput('clear');
                }
                else {
                    //  alert('hi');
                    $('.fileinput').fileinput('clear');
                    alert('Allowed file formats : .pdf & .png');
                }
            }
            else {
                $('.fileinput').fileinput('clear');
                alert('Image already available, advised not to include images');
            }
        };

        $scope.Delfile = function (indx, _id, imgId) {
            if (confirm("Are you sure, deactivate this record?")) {
                $http({
                    method: 'GET',
                    url: '/Catalogue/Deletefile?id=' + _id + '&imgId=' + imgId
                }).success(function (response) {
                    $scope.AtttachmentList.splice(indx, 1);

                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };

        $scope.Downloadfile = function (fileName, type, imgId) {

            $window.open('/Catalogue/Downloadfile?fileName=' + fileName + '&type=' + type + '&imgId=' + imgId);

        };

        $scope.RemoveFile = function (indx) {
            if ($scope.imgList.length > 0) {
                $scope.attachment.splice(indx, 1);
                $scope.imgList.splice(indx, 1);

            }
        };
        //uom

        $http.get('/Catalogue/getuomlist').success(function (response) {
            // alert('hi');
            $scope.uomList1 = response;
            //alert(angular.toJson($scope.uomList1))
        });

        $scope.Searchhsn = function (hsn) {

            $scope.cgBusyPromises = $http({
                method: 'GET',
                url: '/Catalogue/getHSNList?sKey=' + hsn
            }).success(function (response) {

                if (response != '') {
                    $scope.HSN = response;
                    mymodal.open();
                    $scope.Res = "Search results : " + response.length + " items."
                    $scope.Notify = "alert-info";
                    $scope.NotifiyRes = true;


                } else {

                    $scope.Res = "No item found"
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;

                }

            })

        }
        var mymodal = new jBox('Modal', {
            width: 1200,
            blockScroll: false,
            animation: 'zoomIn',

            overlay: true,
            closeButton: true,

            content: jQuery('#cotentid1'),

        });
        $scope.HSNClick = function (H, idx, Noun, Modifier) {

            $scope.HSNID = H.HSNID;
            $scope.Desc = H.Desc;
            $scope.hsn = null;
            mymodal.close();

            if (Noun != null && Modifier != null) {

                $http({
                    method: "GET",
                    url: '/GeneralSettings/Inserthsn?Noun=' + Noun + '&Modifier=' + Modifier + '&HSNID=' + H.HSNID + '&Desc=' + H.Desc
                })
            }
            else {

                alert("Select Noun And Modifier To Assign HSN Code")
                $scope.HSNShow = false;
                $scope.HSNID = null;
                $scope.Desc = null;
            }


        }










        $scope.getmultiplecoderesult = function (code) {
            //alert("hai");
            // alert(angular.toJson(code));
            if (code != undefined && code != "") {
                //alert('in');
                $scope.DataList = [{ 'Itemcode': " " }];
                // $scope.sCode = "";
                $scope.sCode1 = [];
                $scope.temp1 = [];

                if (code != null) {
                    $scope.temp1 = code.split(/[, " "]/);
                    angular.forEach($scope.temp1, function (lst) {
                        // alert(angular.toJson(lst));
                        angular.forEach($scope.DataList1, function (lst1) {
                            //alert(angular.toJson(lst1));
                            //alert(angular.toJson(lst1.Itemcode));
                            if (lst == lst1.Itemcode) {
                                $scope.DataList.push(lst1);
                            }
                        })
                    });
                    //$scope.DataList.RemoveRow[0];
                    $scope.DataList.splice(0, 1);

                }
            }
            else {
                $scope.DataList = $scope.DataList1;
            }
            //  alert(angular.toJson($scope.DataList));

            ////////////////////
            // alert("in");
            //// alert("hai");
            // $http({
            //     method: 'GET',
            //     url: '/Catalogue/getmulticodesearch?sCode=' + $scope.sCode
            // }).success(function (response) {
            //    // alert(angular.toJson(response));
            //     $scope.DataList = response;

            // }).error(function (data, status, headers, config) {
            //     // alert("error");
            // });
        };

        $scope.createData = function (sts) {


            $timeout(function () {
                $('#divNotifiy').attr('style', 'display: none');
            }, 30000);

            var formData = new FormData();
            for (var i = 0; i < $scope.attachment.length; i++) {
                formData.append('files', $scope.attachment[i]);
            }

            //general             
            $scope.erp.Industrysector_ = $scope.erp.Industrysector != null ? $("#ddlindustry").find("option:selected").text() : null;
            $scope.erp.Materialtype_ = $scope.erp.Materialtype != null ? $("#ddlmaterial").find("option:selected").text() : null;
            $scope.erp.BaseUOP_ = $scope.erp.BaseUOP != null ? $("#ddlbaseuop").find("option:selected").text() : null;
            $scope.erp.Unit_issue_ = $scope.erp.Unit_issue != null ? $("#ddluis").find("option:selected").text() : null;
            $scope.erp.AlternateUOM_ = $scope.erp.AlternateUOM != null ? $("#ddlalteruom").find("option:selected").text() : null;
            $scope.erp.Inspectiontype_ = $scope.erp.Inspectiontype != null ? $("#ddlinstype").find("option:selected").text() : null;
            $scope.erp.Inspectioncode_ = $scope.erp.Inspectioncode != null ? $("#ddlinscode").find("option:selected").text() : null;
            $scope.erp.Division_ = $scope.erp.Division != null ? $("#ddldivision").find("option:selected").text() : null;
            $scope.erp.Salesunit_ = $scope.erp.Salesunit != null ? $("#ddlsaleunit").find("option:selected").text() : null;

            //plant
            $scope.erp.Plant_ = $scope.erp.Plant != null ? $("#ddlPlant").find("option:selected").text() : null;
            $scope.erp.ProfitCenter_ = $scope.erp.ProfitCenter != null ? $("#ddlprofit").find("option:selected").text() : null;
            $scope.erp.StorageLocation_ = $scope.erp.StorageLocation != null ? $("#ddlstoreage").find("option:selected").text() : null;
            $scope.erp.StorageBin_ = $scope.erp.StorageBin != null ? $("#ddlbin").find("option:selected").text() : null;
            $scope.erp.ValuationClass_ = $scope.erp.ValuationClass != null ? $("#ddlvclass").find("option:selected").text() : null;
            $scope.erp.PriceControl_ = $scope.erp.PriceControl != null ? $("#ddlprice").find("option:selected").text() : null;
            $scope.erp.ValuationCategory_ = $scope.erp.ValuationCategory != null ? $("#ddlvcat").find("option:selected").text() : null;
            $scope.erp.VarianceKey_ = $scope.erp.VarianceKey != null ? $("#ddlvkey").find("option:selected").text() : null;


            //Mrp data
            $scope.erp.MRPType_ = $scope.erp.MRPType != null ? $("#ddlmrptype").find("option:selected").text() : null;
            $scope.erp.MRPController_ = $scope.erp.MRPController != null ? $("#ddlmrpcontrol").find("option:selected").text() : null;
            $scope.erp.LOTSize_ = $scope.erp.LOTSize != null ? $("#ddllotsize").find("option:selected").text() : null;
            $scope.erp.ProcurementType_ = $scope.erp.ProcurementType != null ? $("#ddlprocurement").find("option:selected").text() : null;
            $scope.erp.PlanningStrgyGrp_ = $scope.erp.PlanningStrgyGrp != null ? $("#ddlplanning").find("option:selected").text() : null;
            $scope.erp.AvailCheck_ = $scope.erp.AvailCheck != null ? $("#ddlavilchk").find("option:selected").text() : null;
            $scope.erp.ScheduleMargin_ = $scope.erp.ScheduleMargin != null ? $("#ddlschedule").find("option:selected").text() : null;

            //Sales & others
            $scope.erp.AccAsignmtCategory_ = $scope.erp.AccAsignmtCategory != null ? $("#ddlasscat").find("option:selected").text() : null;
            $scope.erp.TaxClassificationGroup_ = $scope.erp.TaxClassificationGroup != null ? $("#ddltaxclass").find("option:selected").text() : null;
            $scope.erp.ItemCategoryGroup_ = $scope.erp.ItemCategoryGroup != null ? $("#ddlitemcat").find("option:selected").text() : null;
            $scope.erp.SalesOrganization_ = $scope.erp.SalesOrganization != null ? $("#ddlsales").find("option:selected").text() : null;
            $scope.erp.DistributionChannel_ = $scope.erp.DistributionChannel != null ? $("#ddldistri").find("option:selected").text() : null;
            $scope.erp.MaterialStrategicGroup_ = $scope.erp.MaterialStrategicGroup != null ? $("#ddlmatstra").find("option:selected").text() : null;
            $scope.erp.PurchasingGroup_ = $scope.erp.PurchasingGroup != null ? $("#ddlpurchasegrp").find("option:selected").text() : null;
            $scope.erp.PurchasingValueKey_ = $scope.erp.PurchasingValueKey != null ? $("#ddlpurval").find("option:selected").text() : null;


            // formData.append('files', $scope.attachment);

            formData.append("itemsts", "13");
            formData.append("cat", angular.toJson($scope.cat));

            formData.append("attri", angular.toJson($scope.Characteristics));
            formData.append("ERP", angular.toJson($scope.erp));

            //formData.append("Generalinfo", angular.toJson($scope.gen));
            //formData.append("Plantinfo", angular.toJson($scope.plant));
            //formData.append("MRPdata", angular.toJson($scope.mrpdata));
            //formData.append("Salesinfo", angular.toJson($scope.sales));
            formData.append("Equ", angular.toJson($scope.Equ));
            formData.append("vendorsupplier", angular.toJson($scope.rows));
            formData.append("Attachments", angular.toJson($scope.imgList));
            formData.append("sts", sts);
            formData.append("HSNID", angular.toJson($scope.HSNID));
            formData.append("Desc", angular.toJson($scope.Desc));


            $scope.cgBusyPromises = $http({
                url: "/Catalogue/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {
                // alert(angular.toJson(data));
                if (data.success === false) {

                    $scope.Res = data.errors;
                    $scope.Notify = "alert-danger";
                    $('#divNotifiy').attr('style', 'display: block');

                }
                else {
                    //   alert(angular.toJson(data));
                    //   alert(angular.toJson(data.success));
                    if (data > -1) {

                        $scope.reset();

                        $scope.cat = null;
                        $scope.Characteristics = null;
                        $scope.gen = null;
                        $scope.plant = null;
                        $scope.mrpdata = null;
                        $scope.sales = null;
                        $scope.Equ = null;
                        $scope.rows = null;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                        $scope.imgList = null;
                        $scope.Title = null;
                        $scope.AtttachmentList = null;

                        if ($scope.Commodities != null && $scope.Commodities.length > 0) {
                            $scope.Commodities[0].Class = null;
                            $scope.Commodities[0].ClassTitle = null;
                            $scope.Commodities = null;
                        }

                        $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];



                        //  $scope.LoadData();
                        $scope.searchMaster($scope.sCode, $scope.sSource, $scope.sNoun, $scope.sModifier, $scope.sUser);

                        if (data == 0) {
                            $scope.fromsave = 1;
                            $scope.attachment = [];
                            // $scope.searchMaster();
                            $scope.Res = "Data saved successfully";
                        }
                        if (data == 1) {
                            $scope.Res = "Data duplicated successfully"
                        }
                        if (data == 2) {
                            $scope.Res = "Duplicate data deleted successfully"
                        }
                        $scope.Notify = "alert-info";
                        if (data == 3) {
                            $scope.Notify = "alert-danger";
                            $scope.Res = "Duplicate data not saved"
                        }
                        $('#divNotifiy').attr('style', 'display: block');

                        //  $scope.RowClick(lst, idx);

                        // $scope.LoadData();
                    } else {
                        if ($scope.Characteristics === null)
                            $scope.Res = "Please add characteristics"
                        else
                            $scope.Res = "Data save process failed"

                        $scope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                    }

                }

            }).error(function (data, status, headers, config) {
                $scope.Res = data;
                $scope.Notify = "alert-danger";
                $('#divNotifiy').attr('style', 'display: block');
            });


        };
        $scope.createData1 = function (sts) {


            $timeout(function () {
                $('#divNotifiy').attr('style', 'display: none');
            }, 30000);

            var formData = new FormData();
            for (var i = 0; i < $scope.attachment.length; i++) {
                formData.append('files', $scope.attachment[i]);
            }

            //general             
            $scope.erp.Industrysector_ = $scope.erp.Industrysector != null ? $("#ddlindustry").find("option:selected").text() : null;
            $scope.erp.Materialtype_ = $scope.erp.Materialtype != null ? $("#ddlmaterial").find("option:selected").text() : null;
            $scope.erp.BaseUOP_ = $scope.erp.BaseUOP != null ? $("#ddlbaseuop").find("option:selected").text() : null;
            $scope.erp.Unit_issue_ = $scope.erp.Unit_issue != null ? $("#ddluis").find("option:selected").text() : null;
            $scope.erp.AlternateUOM_ = $scope.erp.AlternateUOM != null ? $("#ddlalteruom").find("option:selected").text() : null;
            $scope.erp.Inspectiontype_ = $scope.erp.Inspectiontype != null ? $("#ddlinstype").find("option:selected").text() : null;
            $scope.erp.Inspectioncode_ = $scope.erp.Inspectioncode != null ? $("#ddlinscode").find("option:selected").text() : null;
            $scope.erp.Division_ = $scope.erp.Division != null ? $("#ddldivision").find("option:selected").text() : null;
            $scope.erp.Salesunit_ = $scope.erp.Salesunit != null ? $("#ddlsaleunit").find("option:selected").text() : null;

            //plant
            $scope.erp.Plant_ = $scope.erp.Plant != null ? $("#ddlPlant").find("option:selected").text() : null;
            $scope.erp.ProfitCenter_ = $scope.erp.ProfitCenter != null ? $("#ddlprofit").find("option:selected").text() : null;
            $scope.erp.StorageLocation_ = $scope.erp.StorageLocation != null ? $("#ddlstoreage").find("option:selected").text() : null;
            $scope.erp.StorageBin_ = $scope.erp.StorageBin != null ? $("#ddlbin").find("option:selected").text() : null;
            $scope.erp.ValuationClass_ = $scope.erp.ValuationClass != null ? $("#ddlvclass").find("option:selected").text() : null;
            $scope.erp.PriceControl_ = $scope.erp.PriceControl != null ? $("#ddlprice").find("option:selected").text() : null;
            $scope.erp.ValuationCategory_ = $scope.erp.ValuationCategory != null ? $("#ddlvcat").find("option:selected").text() : null;
            $scope.erp.VarianceKey_ = $scope.erp.VarianceKey != null ? $("#ddlvkey").find("option:selected").text() : null;


            //Mrp data
            $scope.erp.MRPType_ = $scope.erp.MRPType != null ? $("#ddlmrptype").find("option:selected").text() : null;
            $scope.erp.MRPController_ = $scope.erp.MRPController != null ? $("#ddlmrpcontrol").find("option:selected").text() : null;
            $scope.erp.LOTSize_ = $scope.erp.LOTSize != null ? $("#ddllotsize").find("option:selected").text() : null;
            $scope.erp.ProcurementType_ = $scope.erp.ProcurementType != null ? $("#ddlprocurement").find("option:selected").text() : null;
            $scope.erp.PlanningStrgyGrp_ = $scope.erp.PlanningStrgyGrp != null ? $("#ddlplanning").find("option:selected").text() : null;
            $scope.erp.AvailCheck_ = $scope.erp.AvailCheck != null ? $("#ddlavilchk").find("option:selected").text() : null;
            $scope.erp.ScheduleMargin_ = $scope.erp.ScheduleMargin != null ? $("#ddlschedule").find("option:selected").text() : null;

            //Sales & others
            $scope.erp.AccAsignmtCategory_ = $scope.erp.AccAsignmtCategory != null ? $("#ddlasscat").find("option:selected").text() : null;
            $scope.erp.TaxClassificationGroup_ = $scope.erp.TaxClassificationGroup != null ? $("#ddltaxclass").find("option:selected").text() : null;
            $scope.erp.ItemCategoryGroup_ = $scope.erp.ItemCategoryGroup != null ? $("#ddlitemcat").find("option:selected").text() : null;
            $scope.erp.SalesOrganization_ = $scope.erp.SalesOrganization != null ? $("#ddlsales").find("option:selected").text() : null;
            $scope.erp.DistributionChannel_ = $scope.erp.DistributionChannel != null ? $("#ddldistri").find("option:selected").text() : null;
            $scope.erp.MaterialStrategicGroup_ = $scope.erp.MaterialStrategicGroup != null ? $("#ddlmatstra").find("option:selected").text() : null;
            $scope.erp.PurchasingGroup_ = $scope.erp.PurchasingGroup != null ? $("#ddlpurchasegrp").find("option:selected").text() : null;
            $scope.erp.PurchasingValueKey_ = $scope.erp.PurchasingValueKey != null ? $("#ddlpurval").find("option:selected").text() : null;


            // formData.append('files', $scope.attachment);

            formData.append("itemsts", "11");
            formData.append("PVStatus", "Yes");
            formData.append("cat", angular.toJson($scope.cat));

            formData.append("attri", angular.toJson($scope.Characteristics));
            formData.append("ERP", angular.toJson($scope.erp));

            //formData.append("Generalinfo", angular.toJson($scope.gen));
            //formData.append("Plantinfo", angular.toJson($scope.plant));
            //formData.append("MRPdata", angular.toJson($scope.mrpdata));
            //formData.append("Salesinfo", angular.toJson($scope.sales));
            formData.append("Equ", angular.toJson($scope.Equ));
            formData.append("vendorsupplier", angular.toJson($scope.rows));
            formData.append("Attachments", angular.toJson($scope.imgList));
            formData.append("sts", sts);
            formData.append("HSNID", angular.toJson($scope.HSNID));
            formData.append("Desc", angular.toJson($scope.Desc));


            $scope.cgBusyPromises = $http({
                url: "/Catalogue/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {
                // alert(angular.toJson(data));
                if (data.success === false) {

                    $scope.Res = data.errors;
                    $scope.Notify = "alert-danger";
                    $('#divNotifiy').attr('style', 'display: block');

                }
                else {
                    //   alert(angular.toJson(data));
                    //   alert(angular.toJson(data.success));
                    if (data > -1) {

                        $scope.reset();

                        $scope.cat = null;
                        $scope.Characteristics = null;
                        $scope.gen = null;
                        $scope.plant = null;
                        $scope.mrpdata = null;
                        $scope.sales = null;
                        $scope.Equ = null;
                        $scope.rows = null;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                        $scope.imgList = null;
                        $scope.Title = null;
                        $scope.AtttachmentList = null;

                        if ($scope.Commodities != null && $scope.Commodities.length > 0) {
                            $scope.Commodities[0].Class = null;
                            $scope.Commodities[0].ClassTitle = null;
                            $scope.Commodities = null;
                        }

                        $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];



                        //  $scope.LoadData();
                        $scope.searchMaster($scope.sCode, $scope.sSource, $scope.sNoun, $scope.sModifier, $scope.sUser);

                        if (data == 0) {
                            $scope.fromsave = 1;
                            $scope.attachment = [];
                            // $scope.searchMaster();
                            $scope.Res = "PV data Send successfully";
                        }
                        if (data == 1) {
                            $scope.Res = "Data duplicated successfully"
                        }
                        if (data == 2) {
                            $scope.Res = "Duplicate data deleted successfully"
                        }
                        $scope.Notify = "alert-info";
                        if (data == 3) {
                            $scope.Notify = "alert-danger";
                            $scope.Res = "Duplicate data not saved"
                        }
                        $('#divNotifiy').attr('style', 'display: block');

                        //  $scope.RowClick(lst, idx);

                        // $scope.LoadData();
                    } else {
                        if ($scope.Characteristics === null)
                            $scope.Res = "Please add characteristics"
                        else
                            $scope.Res = "Data save process failed"

                        $scope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                    }

                }

            }).error(function (data, status, headers, config) {
                $scope.Res = data;
                $scope.Notify = "alert-danger";
                $('#divNotifiy').attr('style', 'display: block');
            });


        };

        $scope.loadmodifier = function (noun) {
            $scope.Type = null;
            $scope.cat.Modifier = null;
            $scope.cat.Exceptional = false;
            $scope.Characteristics = null;
            $scope.cat.RevRemarks = null; $scope.cat.RelRemarks = null; $scope.cat.Remarks = null; $scope.cat.EnrichedValue = null;
            $scope.cat.MissingValue = null;
            $scope.cat.RepeatedValue = null;
            $scope.cat.Longdesc = null;
            $scope.cat.Shortdesc = null;
            $scope.cat.Additionalinfo = null;
            $scope.cat.UOM = null;
            $scope.Equ = null;
            $scope.sts4 = false;
            $scope.sts3 = false;
            $scope.Legacy1 = true;
            $scope.reset();
            $scope.cat.Noun = $scope.cat.Noun.toUpperCase();
            // alert("mod");
            //alert(angular.toJson(noun));
            $http({
                method: 'GET',
                url: '/Dictionary/GetModifier?Noun=' + noun
            }).success(function (response) {

                $scope.Modifiers = response;

            }).error(function (data, status, headers, config) {

            });


        }
        $scope.editAction = true;
        $scope.RowClick = function (lst, idx) {




            var usr = $('#usrHid').val();

            $scope.red_commodity = "";
            $scope.Maincode3 = "";
            $scope.Subcode3 = "";
            $scope.Subsubcode3 = "";


            $scope.codeforreject = lst.Itemcode;
            $scope.sts2 = true;
            $scope.sts3 = true;
            $scope.sts4 = false;
            $scope.sts5 = true;
            $scope.Partnum = false;
            $('#divPartnum').attr('style', 'display: none');
            $scope.listptnodup = null;

            $('#divduplicate').attr('style', 'display: none');
            $scope.listptnodup1 = null;

            $http({
                method: 'GET',
                url: '/GeneralSettings/GetUnspsc?Noun=' + lst.Noun + '&Modifier=' + lst.Modifier
            }).success(function (response) {
                if (response != '') {
                    $scope.Commodities = response;
                    if ($scope.Commodities[0].Commodity != null && response[0].Commodity != "")
                        $scope.cat.Unspsc = $scope.Commodities[0].Commodity;
                    else $scope.cat.Unspsc = $scope.Commodities[0].Class;
                }
                else {
                    $scope.Commodities = null;
                }

            }).error(function (data, status, headers, config) {
                // alert("error");

            });

            $http({
                method: 'GET',
                url: '/GeneralSettings/GetHsn?Noun=' + lst.Noun + '&Modifier=' + lst.Modifier
            }).success(function (response) {
                if (response.HSNID != null) {
                    $scope.HSNID = response.HSNID;
                    $scope.Desc = response.Desc;
                    $scope.HSNShow = true;
                }
                else {
                    $scope.HSNShow = false;
                    $scope.HSNID = null;
                    $scope.Desc = null;
                }


            });
            $http({
                method: 'GET',
                url: '/Catalogue/FetchNMRelation?Noun=' + lst.Noun + '&Modifier=' + lst.Modifier
            }).success(function (response) {

                if (response != '') {
                    $scope.tempPlace = response;

                }
                else {
                    $scope.tempPlace = null;
                }

            }).error(function (data, status, headers, config) {
                // alert("error");

            });

            //  alert(angular.toJson($scope.tempPlace));

            var i = 0;
            angular.forEach($scope.DataList, function (lst1) {
                $('#' + i).attr("style", "");
                i++;
            });
            $('#' + idx).attr("style", "background-color:lightblue");

            //   alert(angular.toJson(lst));

            $http({
                method: 'GET',
                url: '/Catalogue/GetERPInfo?itemcode=' + lst.Itemcode
            }).success(function (response) {
                $scope.erp = response;
                if ($scope.erp.Plant == null || $scope.erp.Plant == '')
                    $scope.erp.Plant = $scope.PlantList[0].Plantcode;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

            //Attachments
            $http({
                method: 'GET',
                url: '/Catalogue/GetAttachment?itemcode=' + lst.Materialcode
            }).success(function (response) {
                $scope.AtttachmentList = response;
                //  alert(angular.toJson($scope.AtttachmentList));
            }).error(function (data, status, headers, config) {
                // alert("error");
            });


            $scope.cat = {};

            $http({
                method: 'GET',
                url: '/Catalogue/GetSingleItem?itemcode=' + lst.Itemcode
            }).success(function (response) {

                $scope.cat = response;

                if (response.HSNID != null) {
                    $scope.HSNID = response.HSNID;
                    $scope.Desc = response.HSNDesc;
                }

                //   alert(angular.toJson($scope.cat));
                $scope.Equ = response.Equipment;

                if ((response.PVuser != null && response.PVuser.Name == usr) && (response.ItemStatus == 12 || response.ItemStatus == 13))
                    $scope.editAction = true;
                else $scope.editAction = false;

                $scope.cat.Maincode = $scope.cat.Maincode;
                $scope.getSubcode();
                $scope.cat.Subcode = $scope.cat.Subcode;
                $scope.getSubsubcode();
                $scope.cat.Subsubcode = $scope.cat.Subsubcode;


                var tst = response.Vendorsuppliers;
                if (tst != null && tst != '') {
                    $scope.rows = response.Vendorsuppliers;
                } else {
                    $scope.rows = null;
                    $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];
                }



                $http({
                    method: 'GET',
                    url: '/Dictionary/GetModifier?Noun=' + lst.Noun
                }).success(function (response) {
                    var flg = 0;
                    $scope.Modifiers = response;

                    angular.forEach($scope.Modifiers, function (obj) {
                        if (obj.Modifier == lst.Modifier)
                            flg = 1;
                    });
                    if (flg == 0) {
                        $scope.cat.Modifier = '';

                    }
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });

                ///  $scope.getSimiliar();

                $http({
                    method: 'GET',
                    url: '/Dictionary/GetNounModifier?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {
                    if (response != '') {
                        $scope.NM1 = response.One_NounModifier;
                        $scope.Characteristics = response.ALL_NM_Attributes;

                        $http({
                            method: 'GET',
                            url: '/Catalogue/GetUnits'
                        }).success(function (response) {
                            $scope.UOMs = response;

                        }).error(function (data, status, headers, config) {
                            // 
                        });




                        angular.forEach($scope.Characteristics, function (value1, key1) {

                            angular.forEach($scope.cat.Characteristics, function (value2, key2) {

                                if (value1.Characteristic === value2.Characteristic) {

                                    value1.Value = value2.Value;
                                    value1.UOM = value2.UOM;
                                    value1.Source = value2.Source;
                                    value1.SourceUrl = value2.SourceUrl;
                                    value1.Squence = value2.Squence;
                                }

                            });
                        });

                    }
                    else {

                        $scope.Characteristics = null;
                        // $('#divcharater').attr('style', 'display: none');
                    }
                    //   alert(angular.toJson($scope.Characteristics));
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
                //pvdata
                if ($scope.cat.Quantity_as_on_Date != null)
                    $scope.cat.Quantity_as_on_Date = new Date(parseInt($scope.cat.Quantity_as_on_Date.replace('/Date(', ''))).toLocaleDateString();
                if ($scope.cat.Expired_Date != null)
                    $scope.cat.Expired_Date = new Date(parseInt($scope.cat.Expired_Date.replace('/Date(', ''))).toLocaleDateString();
                if ($scope.cat.GR_Date != null)
                    $scope.cat.GR_Date = new Date(parseInt($scope.cat.GR_Date.replace('/Date(', ''))).toLocaleDateString();
            }).error(function (data, status, headers, config) {
                // alert("error");

            });






        };

        $scope.ddlusrChange = function () {
            if ($scope.usr === undefined || $scope.usr === null) {
                $scope.revshow = true;
            }
            else {
                $scope.revshow = false;

            }
        };




        $scope.SubmitData = function () {

            if ($filter('filter')($scope.DataList, { 'bu': '1' }).length >= 1) {

                $scope.DataList = $filter('filter')($scope.DataList, { 'bu': '1' })

            }

            $scope.DataList = $filter('filter')($scope.DataList, { 'ItemStatus': '1' });


            //  alert(angular.toJson($scope.DataList));
            if ($scope.DataList != "" && $scope.DataList != undefined) {

                $timeout(function () {

                    $('#divNotifiy').attr('style', 'display: none');
                }, 30000);






                $scope.DataList = $filter('filter')($scope.DataList, { 'ItemStatus': '1' })
                var formData = new FormData();

                formData.append("DataList", angular.toJson($scope.DataList));



                $scope.cgBusyPromises = $http({
                    url: "/Catalogue/InsertDataList",
                    method: "POST",
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity,
                    data: formData
                }).success(function (data, status, headers, config) {

                    if (data > 0) {

                        $scope.reset();

                        $scope.cat = null;
                        $scope.Characteristics = null;
                        $scope.Equ = null;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                        $scope.sts4 = false;
                        $scope.sts3 = false;
                        $scope.Res = data + " Data submitted successfully";
                        $scope.Notify = "alert-info";

                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.LoadDatapv();
                    } else {
                        $scope.Res = "Data submission failed"
                        $scope.Notify = "alert-info";

                        $('#divNotifiy').attr('style', 'display: block');
                    }



                }).error(function (data, status, headers, config) {
                    $scope.Res = data;
                    $scope.Notify = "alert-danger";
                    $('#divNotifiy').attr('style', 'display: block');
                });
            }
            else {
                alert("Select saved items to submit");
                $scope.LoadDatapv();
            }



        };


        $scope.LoadMasterData = function () {

            $http({
                method: 'GET',
                url: '/GeneralSettings/GetVendortypeList'
            }).success(function (response) {
                $scope.VendortypeList = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

            $http({
                method: 'GET',
                url: '/GeneralSettings/GetReftypeList'
            }).success(function (response) {
                $scope.ReftypeList = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });

        };
        $scope.LoadMasterData();
        $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1', 'Name': '' }];
        $scope.addRow = function () {




            //var flg = 0;
            //($scopeangular.forEach.rows, function (value, key) {

            //    if ((value.Name == null || value.Name == '') && ( value.RefNo == null || value.RefNo == '')) {





            //        flg = 1;
            //    }
            //});
            //if (flg == 0) {
            //    $scope.rows.push({ 'slno': $scope.rows.length + 1,'s':'0','l':'0' });

            //}
            $scope.rows.push({ 'slno': $scope.rows.length + 1, 's': '0', 'l': '1' });
            // alert(angular.toJson($scope.rows));

        };

        $scope.RemoveRow = function (indx) {

            if ($scope.rows[indx].s != 1) {
                if ($scope.rows.length > 1) {
                    $scope.rows.splice(indx, 1);
                    //  $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];
                }

                if ($scope.rows.length === 1 && indx === 0) {
                    $scope.rows.splice(indx, 1);
                    $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];
                }

                var cunt = 1;
                angular.forEach($scope.rows, function (value, key) {
                    value.slno = cunt++;

                });
            }
            else {
                $timeout(function () {
                    $('#divNotifiy').attr('style', 'display: none');
                }, 5000);

                $scope.Res = "You can't remove this row, coz it will appear in Short Desc.";
                $scope.Notify = "alert-info";
                $('#divNotifiy').attr('style', 'display: block');

            }
        };


























        $scope.checkPartno = function (index) {



            if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined && $scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined) {

                // alert(angular.toJson($scope.rows[index].Refflag));
                $http({
                    method: 'GET',
                    url: '/Catalogue/checkPartno?Partno=' + $scope.rows[index].RefNo + '&icode=' + $scope.cat.Itemcode + '&Flag=' + $scope.rows[index].Refflag
                }).success(function (response) {
                    if (response != '') {
                        //  alert(angular.toJson(response));
                        $scope.listptnodup = response;
                        $scope.showModal = !$scope.showModal;
                        $scope.Partnum = true;
                        $('#divPartnum').attr('style', 'display: block');
                    }
                    else {
                        $scope.Partnum = false;
                        $('#divPartnum').attr('style', 'display: none');
                        $scope.listptnodup = response;
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });
            }

        };

        //$scope.checkPartno = function (index) {



        //    //if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined) {
        //    //    $scope.rows[index].redrefflag = "";
        //    //    if ($scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined) {

        //    //        if ($scope.rows[index].Refflag === "DRAWING & POSITION NUMBER") {
        //    //            var hh = $scope.rows[index].RefNo;
        //    //            $scope.rows[index].RefNo = hh.replace(/[\s]/g, '');

        //    //            var comma = $scope.rows[index].RefNo.slice(-1);

        //    //            if (comma === ',') {
        //    //                $scope.rows[index].redrefno = "red";
        //    //                //$scope.rows[index].RefNo = $scope.rows[index].RefNo.slice(0, -1);
        //    //            }
        //    //            else {
        //    //                $scope.rows[index].redrefno = "";
        //    //            }
        //    //            if ($scope.rows[index].RefNo.indexOf(',') === -1) {
        //    //                $scope.rows[index].redrefno = "red";
        //    //            }

        //    //            if (($scope.rows[index].RefNo.split(",").length - 1) > 1) {
        //    //                $scope.rows[index].redrefno = "red";
        //    //            }
        //    //        }
        //    //        else
        //    //            $scope.rows[index].redrefno = "";
        //    //    }
        //    //    else
        //    //        $scope.rows[index].redrefno = "red";
        //    //}
        //    //else {
        //    //    $scope.rows[index].redrefflag = "";
        //    //    $scope.rows[index].redrefno = "";
        //    //}




        //    if ($scope.rows[index].Refflag != "" && $scope.rows[index].Refflag != null && $scope.rows[index].Refflag != undefined && $scope.rows[index].RefNo != "" && $scope.rows[index].RefNo != null && $scope.rows[index].RefNo != undefined) {

        //       // alert(angular.toJson($scope.rows[index].Refflag));
        //        $http({
        //            method: 'GET',
        //            url: '/Catalogue/checkPartno?Partno=' + $scope.rows[index].RefNo + '&icode=' + $scope.cat.Itemcode + '&Flag=' + $scope.rows[index].Refflag
        //        }).success(function (response) {
        //            if (response != '') {
        //              //  alert(angular.toJson(response));
        //                $scope.listptnodup = response;
        //                $scope.showModal = !$scope.showModal;
        //                $scope.Partnum = true;
        //                $('#divPartnum').attr('style', 'display: block');
        //            }
        //            else {
        //                $scope.Partnum = false;
        //                $('#divPartnum').attr('style', 'display: none');
        //                $scope.listptnodup = response;
        //            }

        //        }).error(function (data, status, headers, config) {
        //            // alert("error");

        //        });
        //    }

        //};

        $scope.curlchk === 0;
        $scope.checkDuplicate = function () {

            $scope.docheck();
            //$scope.chkman = 0;
            //angular.forEach($scope.rows, function (value1, key1) {
            //    if (((value1.Type != null || value1.Type != "") && (value1.Name === null || value1.Name ===""))) {
            //        $scope.chkman = 1;
            //    }

            //    if (((value1.Type === null || value1.Type === "") && (value1.Name != null || value1.Name != ""))) {
            //        $scope.chkman = 1;
            //    }

            //});

            //if ($scope.chkman === 0) {
            //    $scope.pdfcheck = 0;

            //    angular.forEach($scope.imgList, function (value1, key1) {
            //        if (value1.FileName.toUpperCase().includes('.PDF')) {
            //            $scope.pdfcheck = 1;
            //        }

            //    });

            //    if ($scope.pdfcheck != 1) {
            //        //  $scope.AtttachmentList
            //        angular.forEach($scope.AtttachmentList, function (value12, key1) {
            //            if (value12.FileName.toUpperCase().includes('.PDF')) {
            //                $scope.pdfcheck = 1;
            //            }

            //        });


            //    }

            //    $scope.url1 = 0;
            //    $scope.aurl1 = 0;

            //    $scope.curlchk = 0;

            //    $scope.substring = 'INTERNET';
            //    angular.forEach($scope.Characteristics, function (value12, key1) {

            //        if ((value12.SourceUrl === '' || value12.SourceUrl === null || value12.SourceUrl === undefined) && ((value12.Source.indexOf($scope.substring) !== -1))) {
            //            //  alert("in first")
            //            $scope.curlchk = 1;
            //        }

            //        if ((value12.SourceUrl !== '' && value12.SourceUrl !== null && value12.SourceUrl !== undefined) && ((value12.Source.indexOf($scope.substring) === -1))) {
            //            //  alert("in second")
            //            $scope.curlchk = 1;
            //        }


            //        if (value12.SourceUrl != '' && value12.SourceUrl != undefined && value12.SourceUrl != null) {

            //            $scope.aurl1 = 1;
            //        }

            //    });





            //    if ($scope.curlchk === 0) {
            //        if ($scope.aurl1 === 1 && ($scope.cat.Soureurl === '' || $scope.cat.Soureurl === undefined || $scope.cat.Soureurl === null)) {
            //            alert("Source Url missing, which is available in value reference");
            //        }
            //        else {
            //            if (($scope.cat.Soureurl === '' || $scope.cat.Soureurl === undefined || $scope.cat.Soureurl === null) && ($scope.pdfcheck === 0)) {
            //                $scope.docheck();
            //                //  alert('inside both false');
            //            }
            //            else if ($scope.cat.Soureurl != '' && $scope.cat.Soureurl != undefined && $scope.cat.Soureurl != null && $scope.pdfcheck === 1) {
            //                //   alert('inside both true');
            //                $scope.docheck();
            //            }
            //            else {
            //                alert("provide both pdf and Source url");
            //            }
            //        }
            //    }
            //    else {
            //        alert("Source URl and Source description mismatch occurred");
            //    }

            //}
            //else
            //{
            //    alert("Error found at MFR/SPLR section");
            //}

            //  alert(angular.toJson($scope.$scope.cat.Soureurl));
            //  alert(angular.toJson($scope.cat.Characteristics));
            //  alert('hi');



        };
        $scope.docheck = function () {
            var formData = new FormData();
            formData.append("cat", angular.toJson($scope.cat));
            formData.append("attri", angular.toJson($scope.Characteristics));
            formData.append("vendorsupplier", angular.toJson($scope.rows));
            formData.append("Equ", angular.toJson($scope.Equ));
            formData.append("HSNID", angular.toJson($scope.HSNID));
            formData.append("Desc", angular.toJson($scope.Desc));
            //  alert(angular.toJson($scope.cat.Remarks));
            if ($scope.codelogic1 != "UNSPSC Code") {
                //$scope.cat.Maincode = "Border: 1px solid #a94442";
                // $scope.cat.Subcode = "Border: 1px solid #a94442";
                // $scope.cat.Subsubcode = "Border: 1px solid #a94442";
                if ($scope.codelogic1 == "Item Code") {
                    //  $scope.red_commodity = "";
                    $scope.red_commodity = "";
                    $scope.Maincode3 = "";
                    $scope.Subcode3 = "";
                    $scope.Subsubcode3 = "";


                    // alert("hi");
                    $http({
                        url: "/Catalogue/checkDuplicate",
                        method: "POST",
                        headers: { "Content-Type": undefined },
                        transformRequest: angular.identity,
                        data: formData
                    }).success(function (response) {
                        // alert(angular.toJson(response));
                        if (response != '') {
                            $scope.listptnodup1 = response;

                            $('#divduplicate').attr('style', 'display: block');
                        }
                        else {
                            //  alert('hi')
                            $scope.createData('No');

                            $('#divduplicate').attr('style', 'display: none');
                            $scope.listptnodup1 = response;
                        }


                    }).error(function (data, status, headers, config) {
                        // alert("error");

                    });
                }
                else {
                    //  alert(angular.toJson($scope.cat.Maincode));



                    $scope.red_commodity = "";
                    $scope.Maincode3 = "";
                    $scope.Subcode3 = "";
                    $scope.Subsubcode3 = "";

                    // alert("hi");
                    $http({
                        url: "/Catalogue/checkDuplicate",
                        method: "POST",
                        headers: { "Content-Type": undefined },
                        transformRequest: angular.identity,
                        data: formData
                    }).success(function (response) {
                        //  alert(angular.toJson(response));
                        if (response != '') {

                            $scope.listptnodup1 = response;

                            $('#divduplicate').attr('style', 'display: block');
                        }
                        else {
                            // alert('hi');
                            $scope.createData('No');

                            $('#divduplicate').attr('style', 'display: none');
                            $scope.listptnodup1 = response;
                        }


                    }).error(function (data, status, headers, config) {
                        // alert("error");

                    });


                    if ($scope.cat.Maincode == null)
                        $scope.Maincode3 = "Border: 1px solid #a94442";
                    if ($scope.cat.Subcode == null)
                        $scope.Subcode3 = "Border: 1px solid #a94442";
                    if ($scope.cat.Subsubcode == null)
                        $scope.Subsubcode3 = "Border: 1px solid #a94442";

                }


            }
                //else {
                //    
                //}

            else {
                if ($scope.cat.Unspsc != "" && $scope.cat.Unspsc != null && $scope.cat.Unspsc != undefined) {
                    $scope.red_commodity = "";
                    $scope.Maincode3 = "";
                    $scope.Subcode3 = "";
                    $scope.Subsubcode3 = "";
                    // $scope.red_maincode = "Border: 1px solid #a94442";
                    // alert("hi");
                    $http({
                        url: "/Catalogue/checkDuplicate",
                        method: "POST",
                        headers: { "Content-Type": undefined },
                        transformRequest: angular.identity,
                        data: formData
                    }).success(function (response) {
                        // alert(angular.toJson(response));
                        if (response != '') {
                            $scope.listptnodup1 = response;
                            // $scope.red_maincode = "Border: 1px solid #a94442";
                            $('#divduplicate').attr('style', 'display: block');
                        }
                        else {
                            // alert('hi')
                            $scope.createData('No');

                            $('#divduplicate').attr('style', 'display: none');
                            $scope.listptnodup1 = response;
                        }

                    }).error(function (data, status, headers, config) {
                        // alert("error");

                    });
                }
                else {
                    // alert("hi");
                    $scope.unspscact = "active";
                    $scope.Unspsc1 = "active";
                    $scope.desctab = "";
                    $scope.desctab1 = "";
                    $scope.red_commodity = "Border: 1px solid #a94442";
                    // $scope.red_commodity = "";
                    $scope.Maincode3 = "";
                    $scope.Subcode3 = "";
                    $scope.Subsubcode3 = "";

                }
            }


        };

        $scope.formShortLong = function () {







            var formData = new FormData();
            formData.append("cat", angular.toJson($scope.cat));
            formData.append("attri", angular.toJson($scope.Characteristics));
            formData.append("vendorsupplier", angular.toJson($scope.rows));
            formData.append("Equ", angular.toJson($scope.Equ));










            $http({
                url: "/Catalogue/GenerateShortLong",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (response) {

                $scope.cat.Shortdesc = response[0];
                $scope.cat.Longdesc = response[1];

            }).error(function (data, status, headers, config) {
                // alert("error");

            });
        };

        $scope.writeData = function () {
            $scope.createData('Yes');

            $('#divduplicate').attr('style', 'display: none');
            $scope.listptnodup1 = null;
        };

        $scope.NodupData = function () {
            $scope.createData('No');

            $('#divduplicate').attr('style', 'display: none');
            $scope.listptnodup1 = null;
        };

        $scope.closeData = function () {
            $scope.Partnum = false;
            $('#divPartnum').attr('style', 'display: none');
            $scope.listptnodup = null;
        };

        $scope.closeData1 = function () {

            $('#divduplicate').attr('style', 'display: none');
            $scope.listptnodup1 = null;
        };

        $scope.fillData = function (ls) {

            // $scope.cat = {};
            $http({
                method: 'GET',
                url: '/Catalogue/GetSingleItem?itemcode=' + ls.Itemcode
            }).success(function (response) {

                //$scope.cat = response;
                $scope.cat.Noun = response.Noun;
                $scope.cat.Modifier = response.Modifier;
                $scope.cat.Shortdesc = response.Shortdesc;
                $scope.cat.Longdesc = response.Longdesc;
                $scope.cat.Additionalinfo = response.Additionalinfo;
                $scope.cat.Junk = response.Junk;
                $scope.cat.Manufacturer = response.Manufacturer;
                $scope.cat.Application = response.Application;
                $scope.cat.Drawingno = response.Drawingno;
                $scope.cat.Referenceno = response.Referenceno;
                $scope.cat.Remarks = response.Remarks;
                $scope.cat.Characteristics = response.Characteristics;

                $scope.cat.Maincode = $scope.cat.Maincode;
                $scope.getSubcode();
                $scope.cat.Subcode = $scope.cat.Subcode;
                $scope.getSubsubcode();
                $scope.cat.Subsubcode = $scope.cat.Subsubcode;





                //Equipment
                $scope.Equ = response.Equipment;

                //Vendor

                var tst = response.Vendorsuppliers;
                if (tst != null && tst != '') {
                    $scope.rows = response.Vendorsuppliers;
                } else {
                    $scope.rows = null;
                    $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];
                }

                //UNSPSC
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/GetUnspsc?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {
                    if (response != '') {
                        $scope.Commodities = response;
                        if ($scope.Commodities[0].Commodity != null && response[0].Commodity != "")
                            $scope.cat.Unspsc = $scope.Commodities[0].Commodity;
                        else $scope.cat.Unspsc = $scope.Commodities[0].Class;
                    }
                    else {
                        $scope.Commodities = null;
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });
                $http({
                    method: 'GET',
                    url: '/GeneralSettings/GetHsn?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {

                    if (response.HSNID != null) {
                        $scope.HSNID = response.HSNID;
                        $scope.Desc = response.Desc;
                        $scope.HSNShow = true;
                    }
                    else {
                        $scope.HSNShow = false;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                    }

                });
                $http({
                    method: 'GET',
                    url: '/Dictionary/GetModifier?Noun=' + $scope.cat.Noun
                }).success(function (response) {
                    $scope.Modifiers = response;
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });



                $http({
                    method: 'GET',
                    url: '/Dictionary/GetNounModifier?Noun=' + $scope.cat.Noun + '&Modifier=' + $scope.cat.Modifier
                }).success(function (response) {
                    if (response != '') {
                        $scope.NM1 = response.One_NounModifier;
                        $scope.Characteristics = response.ALL_NM_Attributes;

                        $http({
                            method: 'GET',
                            url: '/Catalogue/GetUnits'
                        }).success(function (response) {
                            $scope.UOMs = response;

                        }).error(function (data, status, headers, config) {
                            // alert("error");
                        });

                        angular.forEach($scope.Characteristics, function (value1, key1) {

                            angular.forEach($scope.cat.Characteristics, function (value2, key2) {

                                if (value1.Characteristic === value2.Characteristic) {

                                    value1.Value = value2.Value;
                                    value1.UOM = value2.UOM;

                                }

                            });
                        });
                    }
                    else {

                        $scope.Characteristics = null;
                        // $('#divcharater').attr('style', 'display: none');
                    }

                }).error(function (data, status, headers, config) {
                    // alert("error");
                });

            }).error(function (data, status, headers, config) {
                // alert("error");

            });
        };



        $scope.NotifiyResclose = function () {

            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.SelectCharater = function (Noun, Modifier, Attribute) {


            $http({
                method: 'GET',
                url: '/Catalogue/GetValues?Noun=' + Noun + '&Modifier=' + Modifier + '&Attribute=' + Attribute
            }).success(function (response) {
                $scope.Values = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });


        };


        $scope.SelectEquip = function (Name) {


            $http({
                method: 'GET',
                url: '/Catalogue/GetEquip?EName=' + Name
            }).success(function (response) {
                $scope.Equips = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });


        };

        $scope.checkValue = function (Noun, Modifier, Attribute, Value, indx) {
            //  alert(Value);
            if (Value != null && Value != '') {

                var res = $filter('filter')($scope.tempPlace, { 'KeyValue': Value });

                if (res != null && res != '') {
                    // alert(res[0].KeyValue);
                    if (res[0].KeyAttribute === Attribute && res[0].KeyValue === Value && res[0].Noun === Noun && res[0].Modifier === Modifier) {

                        // alert(res[0].KeyValue);

                        angular.forEach($scope.Characteristics, function (value2, key2) {

                            angular.forEach(res[0].Characteristics, function (value1, key1) {

                                if (value1.Characteristic === value2.Characteristic) {

                                    value2.Value = value1.Value;

                                }

                            })
                        });


                    }
                }
                // alert(angular.toJson($scope.tempRelation))
                // var rela = $filter('filter')($scope.tempRelation, { 'Value1': Value });
                //var rela = $filter('filter')($scope.tempRelation, { 'AttributeName1': Attribute });
                //var flg = 0,flg1 = 0;
                //if (rela != null && rela != '') {

                //    //if (rela[0].AttributeName1 === Attribute && rela[0].Value1 === Value) {
                //    angular.forEach(rela, function (val1, ky1) {

                //        if (val.AttributeName1 === Attribute && val.Value1 === Value) {

                //            angular.forEach($scope.Characteristics, function (val, ky) {

                //                if (val.Characteristic === rela[0].AttributeName2 && val.Value === rela[0].Value2) {

                //                    flg = 1;

                //                }
                //                if (flg == 1) {
                //                    angular.forEach($scope.Characteristics, function (val, ky) {
                //                        if (flg == 1 && val.Characteristic === rela[0].AttributeName3) {
                //                            val.Value = rela[0].Value3;
                //                        }
                //                    });

                //                }
                //                if (val.Characteristic === rela[0].AttributeName3 && val.Value === rela[0].Value3) {

                //                    flg1 = 1;

                //                }
                //                if (flg1 == 1) {
                //                    angular.forEach($scope.Characteristics, function (val, ky) {
                //                        if (val.Characteristic === rela[0].AttributeName2) {

                //                            val.Value = rela[0].Value2;

                //                        }
                //                    });
                //                }
                //            });
                //        }
                //    });




                //} else {


                //}
                //rela = $filter('filter')($scope.tempRelation, { 'Value2': Value });
                //flg = 0; flg1 = 0;
                //if (rela != null && rela != '') {

                //    if (rela[0].AttributeName2 === Attribute && rela[0].Value2 === Value) {

                //        angular.forEach($scope.Characteristics, function (val, ky) {


                //            if (val.Characteristic === rela[0].AttributeName3 && val.Value === rela[0].Value3) {

                //                flg = 1;

                //            }
                //            if (flg == 1) {
                //                angular.forEach($scope.Characteristics, function (val, ky) {
                //                    if (val.Characteristic === rela[0].AttributeName1) {

                //                        val.Value = rela[0].Value1;

                //                    }
                //                });
                //            }

                //            if (val.Characteristic === rela[0].AttributeName1 && val.Value === rela[0].Value1) {

                //                flg1 = 1;

                //            }
                //            if (flg1 == 1) {
                //                angular.forEach($scope.Characteristics, function (val, ky) {
                //                    if (val.Characteristic === rela[0].AttributeName3) {
                //                        val.Value = rela[0].Value3;

                //                    }
                //                });
                //            }
                //        });

                //    }

                //}

                //rela = $filter('filter')($scope.tempRelation, { 'Value3': Value });
                //flg = 0; flg1 = 0;
                //if (rela != null && rela != '') {
                //    if (rela[0].AttributeName3 === Attribute && rela[0].Value3 === Value) {

                //        angular.forEach($scope.Characteristics, function (val, ky) {


                //            if (val.Characteristic === rela[0].AttributeName1 && val.Value === rela[0].Value1) {

                //                flg = 1;

                //            }
                //            if (flg == 1) {

                //                angular.forEach($scope.Characteristics, function (val, ky) {
                //                    if (val.Characteristic === rela[0].AttributeName2) {

                //                        val.Value = rela[0].Value2;
                //                    }
                //                });
                //            }
                //            if (val.Characteristic === rela[0].AttributeName2 && val.Value === rela[0].Value2) {

                //                flg1 = 1;

                //            }
                //            if (flg1 == 1) {
                //                angular.forEach($scope.Characteristics, function (val, ky) {
                //                    if (val.Characteristic === rela[0].AttributeName1) {

                //                        val.Value = rela[0].Value1;

                //                    }
                //                });
                //            }

                //        });
                //    }

                //}






                $http({
                    method: 'GET',
                    url: '/Catalogue/CheckValue?Noun=' + Noun + '&Modifier=' + Modifier + '&Attribute=' + Attribute + '&Value=' + Value

                }).success(function (response) {



                    if (response === "false") {
                        $('#btnabv' + indx).attr('style', 'display:block;background:#fff;border:none;color:#3e79cb;text-decoration:underline;');
                        $('#checkval' + indx).attr('style', 'display:block');
                        $scope.Characteristics[indx].Abbrivation = " ";
                    }
                    else {
                        $('#btnabv' + indx).attr('style', 'display:none');
                        $('#checkval' + indx).attr('style', 'display:block');
                        $scope.Characteristics[indx].Abbrivation = response

                    }

                    //  alert(angular.toJson(response));
                    //  alert(angular.toJson(indx));

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });

                //  alert(angular.toJson($scope.Characteristics));
                $http({
                    method: 'GET',
                    url: '/Catalogue/getunitforvalue?Value=' + Value
                }).success(function (response) {
                    if (response != null) {
                        $scope.Characteristics[indx].UOM = response;
                    }
                    // alert(response);
                    //if (response != null) {
                    //    angular.forEach($scope.UOMList, function (valueee) {
                    //        if(valueee == response)
                    //        {
                    //          //  alert("hi");
                    //            $scope.Characteristics[indx].UOM = response;
                    //        }
                    //    });

                    //}
                }).error(function (data, status, headers, config) {
                    // alert("error");

                });




            } else {

                $('#checkval' + indx).attr('style', 'display:none');
            }
        };

        $scope.AddValue = function (Noun, Modifier, Attribute, Value, abb, indx) {


            if (abb === " " || abb === "") {

                $('#btnabv' + indx).attr('style', 'display:block;background:#fff;border:none;color:#3e79cb;text-decoration:underline;');
                $('#checkval' + indx).attr('style', 'display:block');

            }
            else {

                $http({
                    method: 'GET',
                    url: '/Catalogue/AddValue?Noun=' + Noun + '&Modifier=' + Modifier + '&Attribute=' + Attribute + '&Value=' + Value + '&abb=' + abb
                }).success(function (response) {

                    $('#btnabv' + indx).attr('style', 'display:none');
                    $('#checkval' + indx).attr('style', 'display:block');

                }).error(function (data, status, headers, config) {
                    // alert("error");

                });

            }
        }

        $scope.CancelValue = function (indx) {
            $('#checkval' + indx).attr('style', 'display:none');
            $scope.Characteristics[indx].Abbrivation = null;
        }

        // Material Code
        $scope.BindGroupcodeList = function () {

            $http({
                method: 'GET',
                url: '/GeneralSettings/GetGroupcodeList'
            }).success(function (response) {
                $scope.Groupcodes = response;

            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };

        $scope.BindGroupcodeList();
        $scope.getSubcode = function () {


            if ($scope.cat.Maincode != null)
                $scope.Maincode3 = "";

            $http.get('/GeneralSettings/GetSubGroupcodeList1?MainGroupCode=' + $scope.cat.Maincode
           ).success(function (response) {
               $scope.getsubgroup = response
               // alert(angular.toJson($scope.getsubgroup));
           }).error(function (data, status, headers, config) {
           });
        }

        $scope.getSubsubcode = function () {

            if ($scope.cat.Subcode != null)
                $scope.Subcode3 = "";

            $http.get('/GeneralSettings/GetSubsubGroupcodeList?SubGroupCode=' + $scope.cat.Subcode
           ).success(function (response) {
               $scope.getSubsubgroup = response
               // alert(angular.toJson($scope.getsubgroup));
           }).error(function (data, status, headers, config) {
           });
        }

        $scope.subsubcodechange = function () {
            if ($scope.cat.Subsubcode != null)
                $scope.Subsubcode3 = "";
            // else

        };

        //Code Logic
        $scope.GetCodeLogic = function () {
            $http({
                method: 'GET',
                url: '/Dictionary/Showdata'
            }).success(function (response) {
                $scope.codelogic1 = response.CODELOGIC;
                if (response.CODELOGIC === "Customized Code") {
                    $scope.codeLogic = true;
                    $scope.req_maincode = true;

                }
                else {
                    $scope.codeLogic = false;
                    $scope.req_maincode = false;
                }

            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        }

        $scope.GetCodeLogic();

        $scope.Clarbtn = function () {
            $scope.sts3 = false;
            $scope.sts2 = true;

            $scope.sts4 = true;

        }
        //reject
        $scope.RejectData = function () {
            // alert(angular.toJson($scope.codeforreject));
            if (confirm("Are you sure, send to clarification this record?")) {

                $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

                $scope.cgBusyPromises = $http({
                    method: 'GET',
                    url: '/Catalogue/GetRejectCode?Itemcode=' + $scope.codeforreject + '&Remarks=' + $scope.cat.Remarks
                }).success(function (response) {
                    $scope.Res = "Record sent to Clarification"
                    $scope.Notify = "alert-info";
                    $('#divNotifiy').attr('style', 'display: block');
                    //  alert(angular.toJson($scope.checkSubmit));
                    // $scope.checkSubmit();
                    $scope.reset();

                    $scope.cat = null;
                    $scope.Characteristics = null;
                    $scope.Equ = null;
                    $scope.LoadDatapv();
                    // $scope.reset1();

                    $scope.sts2 = false;

                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };

        //send to pv data

        $scope.PVDATA = function () {
            // alert(angular.toJson($scope.codeforreject));
            if (confirm("Are you sure, send to clarification this record?")) {

                $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

                // $scope.docheck();

                $scope.cgBusyPromises = $http({
                    method: 'GET',
                    url: '/Catalogue/PVDATAASSIGN?Itemcode=' + $scope.codeforreject + '&Remarks=' + $scope.cat.Remarks
                }).success(function (response) {
                    $scope.Res = "Record sent to Clarification"
                    $scope.Notify = "alert-info";
                    $('#divNotifiy').attr('style', 'display: block');
                    //  alert(angular.toJson($scope.checkSubmit));
                    // $scope.checkSubmit();
                    $scope.reset();

                    $scope.cat = null;
                    $scope.Characteristics = null;
                    $scope.Equ = null;
                    $scope.LoadDatapv();
                    // $scope.reset1();

                    $scope.sts5 = false;

                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.bumu = '0';

        $scope.chkmuall = function () {
            //  alert(angular.toJson($scope.bumu));

            if ($scope.bumu === 1) {
                angular.forEach($scope.DataList, function (value1, key1) {
                    //   alert(angular.toJson(value1.Materialcode));
                    //  alert(angular.toJson(value1.ItemStatus));
                    if (value1.ItemStatus === 1) {
                        if (value1.bu != 1)
                            value1.bu = '1';
                    }
                });
            }
            else {
                angular.forEach($scope.DataList, function (value1, key1) {
                    if (value1.bu != 0)
                        value1.bu = '0';
                });
            }
            // alert(angular.toJson($scope.DataList));
        };



        $scope.chkmuone = function (indx) {
            //  alert(angular.toJson($scope.bumu));


            //  alert(angular.toJson($scope.DataList[indx].ItemStatus));
            if ($scope.DataList[indx].ItemStatus === 0) {
                //  alert('in');
                $scope.DataList[indx].bu = 0;
            }
            // if ($scope.DataList[indx].bu != 1)

            //}
            //});

            //else {
            //    angular.forEach($scope.DataList, function (value1, key1) {
            //    if ($scope.DataList[indx].bu != 0)
            //        $scope.DataList[indx].bu = '0';
            //    });
            //}
            // alert(angular.toJson($scope.DataList));
        };


        $scope.fromsave = 0;
        //Search 

        $scope.searchMaster = function (sCode, sSource, sNoun, sModifier, sUser) {

            var formData = new FormData();
            formData.append("sCode", $scope.sCode);
            formData.append("sSource", $scope.sSource);
            formData.append("sShort", $scope.sShort);
            formData.append("sLong", $scope.sLong);
            formData.append("sNoun", $scope.sNoun);
            formData.append("sModifier", $scope.sModifier);
            formData.append("sUser", $scope.sUser);
            formData.append("sStatus", $scope.sStatus);
            formData.append("sType", $scope.sType);
            if (($scope.sCode != undefined && $scope.sCode != '') || ($scope.sSource != undefined && $scope.sSource != '') || ($scope.sShort != undefined && $scope.sShort != '') || ($scope.sLong != undefined && $scope.sLong != '') || ($scope.sNoun != undefined && $scope.sNoun != '') || ($scope.sModifier != undefined && $scope.sModifier != '') || ($scope.sUser != undefined && $scope.sUser != '') || ($scope.sType != undefined && $scope.sType != '') || ($scope.sStatus != undefined && $scope.sStatus != '')) {

                $scope.cgBusyPromises = $http({
                    method: 'POST',
                    url: '/Catalogue/searchMaster',
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity,
                    data: formData,
                }).success(function (response) {

                    $scope.DataList = response;

                    //angular.forEach($scope.DataList, function (lst) {
                    //    lst.bu = '0';

                    //});

                    if (response != null && response.length > 0) {
                        //  alert(angular.toJson($scope.fromsave));
                        if ($scope.fromsave === 1) {
                            $scope.fromsave = 0;
                            $scope.Res = "Data Saved successfully";
                            // alert(angular.toJson($scope.fromsave));
                        }
                        else {
                            $scope.Res = "Search result : " + response.length + " records found";
                        }

                        $scope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');


                    } else {
                        $scope.Res = "Records not found";
                        $scope.Notify = "alert-danger";
                        $('#divNotifiy').attr('style', 'display: block');
                    }
                    //$(".loaderb_div").hide();
                }).error(function (data, status, headers, config) {
                    // alert("error");

                });
            } else {

                $scope.LoadDatapv();
            }
        }
        $scope.createData2 = function (sts) {


            $timeout(function () {
                $('#divNotifiy').attr('style', 'display: none');
            }, 30000);

            var formData = new FormData();
            for (var i = 0; i < $scope.attachment.length; i++) {
                formData.append('files', $scope.attachment[i]);
            }

            //general             
            $scope.erp.Industrysector_ = $scope.erp.Industrysector != null ? $("#ddlindustry").find("option:selected").text() : null;
            $scope.erp.Materialtype_ = $scope.erp.Materialtype != null ? $("#ddlmaterial").find("option:selected").text() : null;
            $scope.erp.BaseUOP_ = $scope.erp.BaseUOP != null ? $("#ddlbaseuop").find("option:selected").text() : null;
            $scope.erp.Unit_issue_ = $scope.erp.Unit_issue != null ? $("#ddluis").find("option:selected").text() : null;
            $scope.erp.AlternateUOM_ = $scope.erp.AlternateUOM != null ? $("#ddlalteruom").find("option:selected").text() : null;
            $scope.erp.Inspectiontype_ = $scope.erp.Inspectiontype != null ? $("#ddlinstype").find("option:selected").text() : null;
            $scope.erp.Inspectioncode_ = $scope.erp.Inspectioncode != null ? $("#ddlinscode").find("option:selected").text() : null;
            $scope.erp.Division_ = $scope.erp.Division != null ? $("#ddldivision").find("option:selected").text() : null;
            $scope.erp.Salesunit_ = $scope.erp.Salesunit != null ? $("#ddlsaleunit").find("option:selected").text() : null;

            //plant
            $scope.erp.Plant_ = $scope.erp.Plant != null ? $("#ddlPlant").find("option:selected").text() : null;
            $scope.erp.ProfitCenter_ = $scope.erp.ProfitCenter != null ? $("#ddlprofit").find("option:selected").text() : null;
            $scope.erp.StorageLocation_ = $scope.erp.StorageLocation != null ? $("#ddlstoreage").find("option:selected").text() : null;
            $scope.erp.StorageBin_ = $scope.erp.StorageBin != null ? $("#ddlbin").find("option:selected").text() : null;
            $scope.erp.ValuationClass_ = $scope.erp.ValuationClass != null ? $("#ddlvclass").find("option:selected").text() : null;
            $scope.erp.PriceControl_ = $scope.erp.PriceControl != null ? $("#ddlprice").find("option:selected").text() : null;
            $scope.erp.ValuationCategory_ = $scope.erp.ValuationCategory != null ? $("#ddlvcat").find("option:selected").text() : null;
            $scope.erp.VarianceKey_ = $scope.erp.VarianceKey != null ? $("#ddlvkey").find("option:selected").text() : null;


            //Mrp data
            $scope.erp.MRPType_ = $scope.erp.MRPType != null ? $("#ddlmrptype").find("option:selected").text() : null;
            $scope.erp.MRPController_ = $scope.erp.MRPController != null ? $("#ddlmrpcontrol").find("option:selected").text() : null;
            $scope.erp.LOTSize_ = $scope.erp.LOTSize != null ? $("#ddllotsize").find("option:selected").text() : null;
            $scope.erp.ProcurementType_ = $scope.erp.ProcurementType != null ? $("#ddlprocurement").find("option:selected").text() : null;
            $scope.erp.PlanningStrgyGrp_ = $scope.erp.PlanningStrgyGrp != null ? $("#ddlplanning").find("option:selected").text() : null;
            $scope.erp.AvailCheck_ = $scope.erp.AvailCheck != null ? $("#ddlavilchk").find("option:selected").text() : null;
            $scope.erp.ScheduleMargin_ = $scope.erp.ScheduleMargin != null ? $("#ddlschedule").find("option:selected").text() : null;

            //Sales & others
            $scope.erp.AccAsignmtCategory_ = $scope.erp.AccAsignmtCategory != null ? $("#ddlasscat").find("option:selected").text() : null;
            $scope.erp.TaxClassificationGroup_ = $scope.erp.TaxClassificationGroup != null ? $("#ddltaxclass").find("option:selected").text() : null;
            $scope.erp.ItemCategoryGroup_ = $scope.erp.ItemCategoryGroup != null ? $("#ddlitemcat").find("option:selected").text() : null;
            $scope.erp.SalesOrganization_ = $scope.erp.SalesOrganization != null ? $("#ddlsales").find("option:selected").text() : null;
            $scope.erp.DistributionChannel_ = $scope.erp.DistributionChannel != null ? $("#ddldistri").find("option:selected").text() : null;
            $scope.erp.MaterialStrategicGroup_ = $scope.erp.MaterialStrategicGroup != null ? $("#ddlmatstra").find("option:selected").text() : null;
            $scope.erp.PurchasingGroup_ = $scope.erp.PurchasingGroup != null ? $("#ddlpurchasegrp").find("option:selected").text() : null;
            $scope.erp.PurchasingValueKey_ = $scope.erp.PurchasingValueKey != null ? $("#ddlpurval").find("option:selected").text() : null;


            // formData.append('files', $scope.attachment);

            formData.append("itemsts", "13");
            formData.append("PVStatus", "Completed");
            formData.append("cat", angular.toJson($scope.cat));

            formData.append("attri", angular.toJson($scope.Characteristics));
            formData.append("ERP", angular.toJson($scope.erp));

            //formData.append("Generalinfo", angular.toJson($scope.gen));
            //formData.append("Plantinfo", angular.toJson($scope.plant));
            //formData.append("MRPdata", angular.toJson($scope.mrpdata));
            //formData.append("Salesinfo", angular.toJson($scope.sales));
            formData.append("Equ", angular.toJson($scope.Equ));
            formData.append("vendorsupplier", angular.toJson($scope.rows));
            formData.append("Attachments", angular.toJson($scope.imgList));
            formData.append("sts", sts);
            formData.append("HSNID", angular.toJson($scope.HSNID));
            formData.append("Desc", angular.toJson($scope.Desc));


            $scope.cgBusyPromises = $http({
                url: "/Catalogue/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {
                // alert(angular.toJson(data));
                if (data.success === false) {

                    $scope.Res = data.errors;
                    $scope.Notify = "alert-danger";
                    $('#divNotifiy').attr('style', 'display: block');

                }
                else {
                    //   alert(angular.toJson(data));
                    //   alert(angular.toJson(data.success));
                    if (data > -1) {

                        $scope.reset();

                        $scope.cat = null;
                        $scope.Characteristics = null;
                        $scope.gen = null;
                        $scope.plant = null;
                        $scope.mrpdata = null;
                        $scope.sales = null;
                        $scope.Equ = null;
                        $scope.rows = null;
                        $scope.HSNID = null;
                        $scope.Desc = null;
                        $scope.imgList = null;
                        $scope.Title = null;
                        $scope.AtttachmentList = null;

                        if ($scope.Commodities != null && $scope.Commodities.length > 0) {
                            $scope.Commodities[0].Class = null;
                            $scope.Commodities[0].ClassTitle = null;
                            $scope.Commodities = null;
                        }

                        $scope.rows = [{ 'slno': 1, 's': '0', 'l': '1' }];



                        //  $scope.LoadData();
                        $scope.searchMaster($scope.sCode, $scope.sSource, $scope.sNoun, $scope.sModifier, $scope.sUser);

                        if (data == 0) {
                            $scope.fromsave = 1;
                            $scope.attachment = [];
                            // $scope.searchMaster();
                            $scope.Res = "PV data Send to  Catalogue successfully";
                        }
                        if (data == 1) {
                            $scope.Res = "Data duplicated successfully"
                        }
                        if (data == 2) {
                            $scope.Res = "Duplicate data deleted successfully"
                        }
                        $scope.Notify = "alert-info";
                        if (data == 3) {
                            $scope.Notify = "alert-danger";
                            $scope.Res = "Duplicate data not saved"
                        }
                        $('#divNotifiy').attr('style', 'display: block');

                        //  $scope.RowClick(lst, idx);

                        // $scope.LoadData();
                    } else {
                        if ($scope.Characteristics === null)
                            $scope.Res = "Please add characteristics"
                        else
                            $scope.Res = "Data save process failed"

                        $scope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                    }

                }

            }).error(function (data, status, headers, config) {
                $scope.Res = data;
                $scope.Notify = "alert-danger";
                $('#divNotifiy').attr('style', 'display: block');
            });


        };
        //pvdata
        //$scope.LoadDatapv = function () {

        //    $http({
        //        method: 'GET',
        //        url: '/Catalogue/GetDataListpv'
        //    }).success(function (response) {
        //        $scope.DataListpv = response;


        //        //angular.forEach($scope.DataList, function (lst) {
        //        //    lst.bu = '0';

        //        //});


        //        //$scope.saveditems = ($filter('filter')($scope.DataList, { 'ItemStatus': '1' })).length;
        //        //$scope.balanceitems = ($filter('filter')($scope.DataList, { 'ItemStatus': '0' })).length;


        //        $scope.checkSubmit();
        //    }).error(function (data, status, headers, config) {
        //        // alert("error");
        //    });

        //};
        //$scope.LoadDatapv();


    });


    app.factory("AutoCompleteService", ["$http", function ($http) {
        return {
            search: function (term) {
                return $http({
                    url: "/Dictionary/AutoCompleteNoun?term=" + term,
                    method: "GET"
                }).success(function (response) {
                    return response.data;
                });
            }
        };
    }]);

    app.directive("autoComplete", ["AutoCompleteService", function (AutoCompleteService) {
        return {
            restrict: "A",
            link: function (scope, elem, attr, ctrl) {
                elem.autocomplete({
                    source: function (searchTerm, response) {

                        AutoCompleteService.search(searchTerm.term).success(function (autocompleteResults) {

                            response($.map(autocompleteResults, function (autocompleteResult) {
                                return {
                                    label: autocompleteResult.Noun,
                                    value: autocompleteResult
                                }
                            }))
                        });
                    },
                    minLength: 1,
                    select: function (event, selectedItem, http) {
                        scope.cat.Noun = selectedItem.item.value;

                        $.get("/Dictionary/GetModifier?Noun=" + selectedItem.item.value).success(function (response) {
                            scope.Modifiers = response;
                            scope.$apply();
                            event.preventDefault();
                        });

                    }
                });

            }

        };
    }]);

    app.factory("AutoCompleteService1", ["$http", function ($http) {
        return {
            search: function (term) {
                return $http({
                    url: "/Catalogue/AutoCompleteVendor?term=" + term,
                    method: "GET"
                }).success(function (response) {
                    return response.data;
                });
            }
        };
    }]);
    app.directive("autoComplete1", ["AutoCompleteService1", function (AutoCompleteService) {
        return {
            restrict: "A",
            link: function (scope, elem, attr, ctrl) {
                elem.autocomplete({
                    source: function (searchTerm, response) {

                        AutoCompleteService.search(searchTerm.term).success(function (autocompleteResults) {

                            response($.map(autocompleteResults, function (autocompleteResult) {
                                return {
                                    label: autocompleteResult.Name + (autocompleteResult.Name2 = autocompleteResult.Name2 == null ? '' : autocompleteResult.Name2) + (autocompleteResult.Name3 = autocompleteResult.Name3 == null ? '' : autocompleteResult.Name3) + (autocompleteResult.Name4 = autocompleteResult.Name4 == null ? '' : autocompleteResult.Name4) + (autocompleteResult.Acquiredby == null ? '' : ' (Acquired by ' + autocompleteResult.AcquiredCompanyName + ')'),
                                    value: autocompleteResult
                                }
                            }))
                        });
                    },
                    minLength: 1,
                    select: function (event, selectedItem, http) {

                        //if (selectedItem.item.value.AcquiredCompanyName == null) {
                        scope.cat.Manufacturer = selectedItem.item.value.Name + (selectedItem.item.value.Name2 = selectedItem.item.value.Name2 == null ? '' : selectedItem.item.value.Name2) + (selectedItem.item.value.Name3 = selectedItem.item.value.Name3 == null ? '' : selectedItem.item.value.Name3) + (selectedItem.item.value.Name4 = selectedItem.item.value.Name4 == null ? '' : selectedItem.item.value.Name4);

                        // } else {

                        //  scope.cat.Manufacturer = selectedItem.item.value.AcquiredCompanyName;

                        // }

                        //scope.cat.Manufacturer = selectedItem.item.value.Name + (selectedItem.item.value.Name2 = selectedItem.item.value.Name2 == null ? '' : selectedItem.item.value.Name2) + (selectedItem.item.value.Name3 = selectedItem.item.value.Name3 == null ? '' : selectedItem.item.value.Name3) + (selectedItem.item.value.Name4 = selectedItem.item.value.Name4 == null ? '' : selectedItem.item.value.Name4) + (selectedItem.item.value.AcquiredCompanyName == null ? '' : selectedItem.item.value.AcquiredCompanyName);
                        // scope.cat.Manufacturercode = selectedItem.item.value.Code;
                        //scope.uo.UOM = selectedItem.item.value.Unitname;
                        scope.$apply();
                        event.preventDefault();
                    }
                });

            }

        };
    }]);


    app.directive('capitalize', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        // see where the cursor is before the update so that we can set it back
                        var selection = element[0].selectionStart;
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                        // set back the cursor after rendering
                        element[0].selectionStart = selection;
                        element[0].selectionEnd = selection;
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    });



    app.factory("AutoCompleteService1", ["$http", function ($http) {
        return {
            search: function (term) {
                return $http({
                    url: "/Catalogue/AutoCompleteVendor?term=" + term,
                    method: "GET"
                }).success(function (response) {
                    return response.data;
                });
            }
        };
    }]);
    app.directive("autoComplete2", ["AutoCompleteService1", function (AutoCompleteService) {
        return {
            restrict: "A",
            link: function (scope, elem, attr, ctrl) {
                elem.autocomplete({
                    source: function (searchTerm, response) {

                        AutoCompleteService.search(searchTerm.term).success(function (autocompleteResults) {

                            response($.map(autocompleteResults, function (autocompleteResult) {
                                return {
                                    label: autocompleteResult.Name + (autocompleteResult.Name2 = autocompleteResult.Name2 == null ? '' : autocompleteResult.Name2) + (autocompleteResult.Name3 = autocompleteResult.Name3 == null ? '' : autocompleteResult.Name3) + (autocompleteResult.Name4 = autocompleteResult.Name4 == null ? '' : autocompleteResult.Name4) + (autocompleteResult.Acquiredby == null ? '' : ' (Acquired by ' + autocompleteResult.AcquiredCompanyName + ')'),
                                    value: autocompleteResult
                                }
                            }))
                        });
                    },
                    minLength: 1,
                    select: function (event, selectedItem, http) {
                        //if (selectedItem.item.value.AcquiredCompanyName == null) {
                        scope.rw.Name = selectedItem.item.value.Name + (selectedItem.item.value.Name2 = selectedItem.item.value.Name2 == null ? '' : selectedItem.item.value.Name2) + (selectedItem.item.value.Name3 = selectedItem.item.value.Name3 == null ? '' : selectedItem.item.value.Name3) + (selectedItem.item.value.Name4 = selectedItem.item.value.Name4 == null ? '' : selectedItem.item.value.Name4);
                        scope.rw.Code = selectedItem.item.value.Code;
                        // } else {

                        //  scope.rw.Name = selectedItem.item.value.AcquiredCompanyName;
                        //  scope.rw.Code = selectedItem.item.value.Acquiredby;
                        // }

                        //scope.uo.UOM = selectedItem.item.value.Unitname;
                        scope.$apply();
                        event.preventDefault();
                    }
                });

            }

        };
    }]);



})();