var db = new PouchDB('offline');
var app=angular.module('root', []);
app.controller('root', ['$scope', '$interval', function($scope, $interval){
    //$scope.data=[];
    //$scope.prueba='Online';
    $scope.agregar=function(){
        //$scope.data.unshift($scope.nombres);
        db.post({nombres:$scope.nombres});
        $scope.nombres='';
        $scope.dumpData;
    }
    $scope.borrar=function(){
        db.allDocs({include_docs: true}).then(function(docs){
            $.each(docs.rows, function(key, doc){
                db.remove(doc.id, doc.value.rev).then(function(){console.log('recurso borrado')}).catch(function(){console.log('recurso no borrado')});
                //console.log(doc.id+':'+doc.value.rev);
            })
        });
    }
        
    $scope.dumpData=function(){
        db.allDocs({include_docs: true}).then(function(data){
            //console.log(data.rows);
            $scope.data=data.rows;
            //$scope.prueba='Cargado';
        });
    }
    $interval(function(){
        $scope.dumpData();
    }, 10);
    //$scope.dumpData;
    $(window).bind({
        online:function(){
            $scope.prueba='Online'
            console.log('online');
        },
        offline:function(){
            console.log('offline');
            $scope.prueba='Offline'
        }
    });
    if(window.navigator.onLine)$scope.prueba='Online';
    if(!window.navigator.onLine)$scope.prueba='Offline';
}]);

app.controller('intervalController', ['$interval', '$timeout', function($interval, $timeout){
    $interval(function(){console.log('yotas')}, 1000);
}]);
/*var db = new PouchDB('pruebas');

doc1={
    _id:'report1',
    asset_id:'5',
    asset:'K358182SJ',
    estado:'aprobado',
    service_order:2,
    service_unit:'204-Alice, TX Service Center'
}
doc2={
    _id:'report2',
    asset_id:'5',
    asset:'K358182SJ',
    estado:'aprobado',
    service_order:2,
    service_unit:'204-Alice, TX Service Center',
    client:'Colservers',
    country:'Colombia'
}
db.put(doc1);					
db.put(doc2);
db.allDocs({include_docs: true}).then(function(x){console.log(x)});*/