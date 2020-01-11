import md5 from "react-native-md5";

//得到sign的方法
get_sign = (params, key) => {
    var s_keys = [];
    for (var i in params) {
        s_keys.push(i);
    }
    s_keys.sort();
    var data = "";
    for (var i = 0; i < s_keys.length; i++) {
        // encodeURIComponent 返回的转义数字必须为大写( 如 %2F )
        data += (data ? "&" : "") + s_keys[i] + "=" + encodeURIComponent(params[s_keys[i]]);
    }
    return {
        "sign": md5.hex_md5(data + key),
        "params": data
    };
}

//获取视频详情参数
export const getVideoDetilUrl = (aid) => {
    let paramsObj = {
        // aid: "78126101",
        aid: aid,
        appkey: "1d8b6e7d45233436",
        build: "5480400",
        ts: new Date().getTime()
    }
    let appserct = "560c52ccd288fed045859ed18bffd973";

    let signObj = get_sign(paramsObj, appserct);
    console.log(signObj);
    let path = "https://app.bilibili.com/x/v2/view";
    let data = signObj.params;
    let sign = signObj.sign;
    let url = `${path}?${data}&sign=${sign}`;
    return url;
}

//获取视频播放参数 视频解析
export const getVideoPlayerUrl = (cid, qn = 64) => {
    let appserctV2 = "aHRmhWMLkdeMuILqORnYZocwMBpMEOdt";

    let vedioParamsObjV2 = {
        appkey: "iVGUTjsxvpLeuDCf",
        build: "500001",
        buvid: "C0928256-085D-4722-A38F-2E343710C8B3155817infoc",
        cid: cid,
        device: "android",
        otype: "json",
        platform: "android",
        qn: qn
    }
    let vedioSignObjV2 = get_sign(vedioParamsObjV2, appserctV2);
    let vedioPathV2 = "https://app.bilibili.com/playurl";
    let vedioV2Data = vedioSignObjV2.params;
    let vedioV2Sign = vedioSignObjV2.sign;
    let vedioV2Url = `${vedioPathV2}?${vedioV2Data}&sign=${vedioV2Sign}`;
    return vedioV2Url;
}



// 数字格式化
export const numFormat = (num, mode = 0) => {
    let formatNum = '';
    if (mode === 0) {
        formatNum = num >= 10000 ? (num / 10000).toFixed(1) + '万' : num
    }
    return formatNum;
}