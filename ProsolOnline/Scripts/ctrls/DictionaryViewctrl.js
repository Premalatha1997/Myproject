﻿
(function () {
    'use strict';
    var app = angular.module('ProsolApp', ['angular.filter']);

    app.controller('DictionaryViewController', ['$scope', '$http','$window', function ($scope, $http, $window) {

        $http({
            method: 'GET',
            url: '/Dictionary/GetNoun'
        }).success(function (response) {

            $scope.Nouns = response;

        }).error(function (data, status, headers, config) {
            alert("error");

        });

        $scope.SelectNoun = function () {
     
           
            $scope.modifierDef = null;
            $scope.modifier = null;
            $scope.NounEqu = null;
          

            if ($scope.lst.Noun.toString().indexOf(',') == -1) {

                $scope.noun = $scope.lst.Noun;

                var NDef = $.grep($scope.Nouns, function (lst) {
                    return lst.Noun == $scope.lst.Noun;
                })[0].NounDefinition;

                $scope.nounDef = NDef;
            }

            $http({
                method: 'GET',
                url: '/Dictionary/GetModifier',
                params: { Noun: $scope.noun }
                //?Noun='+$scope.noun
            }).success(function (response) {

                $scope.Modifiers = response;
                $scope.NounSynonyms = response[0].NounEqu;
             
            }).error(function (data, status, headers, config) {
               // alert("error");

            });
            $scope.NM.FileData = null;
            $scope.rows = null;
        };

        $scope.SelectModifier = function () {

            $scope.charaterDef = null;
            $scope.charater = null;

            if ($scope.lst.Modifier.toString().indexOf(',') == -1) {

              //  $scope.modifier = $scope.lst.Modifier;

                var NDef = $.grep($scope.Modifiers, function (lst) {
                    return lst.Modifier == $scope.lst.Modifier;
                })[0].ModifierDefinition;

                $scope.modifierDef = NDef;
            }

            $http({
                method: 'GET',
                url: '/Dictionary/GetNounModifier',
                params:{Noun: $scope.noun , Modifier: $scope.lst.Modifier}
                //?Noun=' + $scope.noun + '&Modifier=' + $scope.lst.Modifier

            }).success(function (response) {
               //  alert(JSON.stringify(response.ALL_NM_Attributes));
                $scope.NM = response.One_NounModifier;
                $scope.rows = response.ALL_NM_Attributes;

                $scope.nounDef = response.One_NounModifier.Nounabv;

              //  alert(angular.toJson($scope.NM))
            }).error(function (data, status, headers, config) {
                alert("error");

            });

        };

        $scope.SelectCharater = function () {

            if ($scope.lst.Characteristic.toString().indexOf(',') == -1) {

              //  $scope.charater = $scope.lst.Characteristic;
                var NDef = $.grep($scope.rows, function (lst) {
                    return lst.Characteristic == $scope.lst.Characteristic;
                })[0].Definition;

                $scope.charaterDef = NDef;
            }

            $http({
                method: 'GET',
                url: '/Dictionary/GetValuesList',
                params: { Noun: $scope.noun, Modifier: $scope.lst.Modifier, Characteristic: $scope.lst.Characteristic }
                //?Noun=' + $scope.noun + '&Modifier=' + $scope.lst.Modifier + '&Characteristic=' + $scope.lst.Characteristic

            }).success(function (response) {             
                $scope.Values = response;              

            }).error(function (data, status, headers, config) {
                alert("error");

            });

        };

        $scope.DonloadNM = function () {
            $window.open('/Dictionary/Download');           

        };
       
    }]);   

})();