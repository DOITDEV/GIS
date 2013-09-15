/*
 * 简单版marker避让
 * @param latlngs 需要避让的经纬度数组
 */
function markerVoid(latlngs){
    var headings = [];
    for(var i = 0; i < latlngs.length; i++){
        headings[i] = getHeading(latlngs[i]['lat'], latlngs[i]['lng'], latlng['lat'], latlng['lng']);
    }
    clearPanoOverlays();
    /* marker避让，30度内只显示1个marker */
    for(var i = 0; i <= 360; i+=30){
        for(var k = 0; k < headings.length; k++){
            if(i < headings[k] && headings[k] < i+30){
                pano_label.push(new soso.maps.PanoramaLabel({
                    position : pois[k].latLng,
                    altitude : 100,
                    panorama : pano,
                    content : pois[k].name
                }));
                (function(k){ //为PanoramaLabel添加点击事件
                    soso.maps.event.addListener(pano_label[pano_label.length-1], "click", function(){                            
                        panoServer.getPano(pois[k].latLng, 1000, function(result){
                            pano_id = result.svid;
                            pano_heading = getHeading(pois[k].latLng['lat'], pois[k].latLng['lng'], result.latlng.lat, result.latlng.lng);
                            pano.setPano(pano_id);
                            pano.setPov({heading : pano_heading});
                        });
                    });
                })(k);
                break;
            }    
        }
    }
}
/*
 * 通过经纬度获取街景视线
 * @param locLat,locLng 原始点纬度，经度
 * @param panoLat,panoLng 街景纬度，经度 
 */
function getHeading(locLat, locLng, panoLat, panoLng){
    var heading = Math.acos((locLat - panoLat) / Math.sqrt(Math.pow(locLng - panoLng, 2) + Math.pow(locLat - panoLat, 2)));
    if (locLng - panoLng < 0) {
        heading = Math.PI * 2 - heading;
    }
    return heading/Math.PI*180;
}