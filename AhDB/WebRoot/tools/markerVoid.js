/*
 * �򵥰�marker����
 * @param latlngs ��Ҫ���õľ�γ������
 */
function markerVoid(latlngs){
    var headings = [];
    for(var i = 0; i < latlngs.length; i++){
        headings[i] = getHeading(latlngs[i]['lat'], latlngs[i]['lng'], latlng['lat'], latlng['lng']);
    }
    clearPanoOverlays();
    /* marker���ã�30����ֻ��ʾ1��marker */
    for(var i = 0; i <= 360; i+=30){
        for(var k = 0; k < headings.length; k++){
            if(i < headings[k] && headings[k] < i+30){
                pano_label.push(new soso.maps.PanoramaLabel({
                    position : pois[k].latLng,
                    altitude : 100,
                    panorama : pano,
                    content : pois[k].name
                }));
                (function(k){ //ΪPanoramaLabel��ӵ���¼�
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
 * ͨ����γ�Ȼ�ȡ�־�����
 * @param locLat,locLng ԭʼ��γ�ȣ�����
 * @param panoLat,panoLng �־�γ�ȣ����� 
 */
function getHeading(locLat, locLng, panoLat, panoLng){
    var heading = Math.acos((locLat - panoLat) / Math.sqrt(Math.pow(locLng - panoLng, 2) + Math.pow(locLat - panoLat, 2)));
    if (locLng - panoLng < 0) {
        heading = Math.PI * 2 - heading;
    }
    return heading/Math.PI*180;
}