import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import { Message, Loading } from 'element-ui';
import { jsonToUrl, throttle } from '@tencent/txv-utils';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

const loadingTips = {
    get: '数据加载中，请稍等~',
    post: '数据提交中，请稍等~'
};

const successCodes = [
    {
        field: 'errno',
        success: [0]
    },
    {
        field: 'code',
        success: [0, 100000]
    },
    {
        field: 'ErrCode',
        success: [0]
    }
];
let loading = {
    close() {}
};

// 判断数据是否需要序列化
const isSerialize = (config) => {
    const { isSerialize = true, method } = config;
    const fmtMethod = method.toLocaleLowerCase();

    return isSerialize && (fmtMethod === 'post' || fmtMethod === 'put' || fmtMethod === 'delete');
};

// 开发环境url做处理
const isFmtUrl = config => process.env.NODE_ENV === 'development' && config.url.indexOf('http') < 0;

const message = throttle((res) => {
    Message.error({ message: res.msg || res.message });
}, 800);

// http request 拦截器
axios.interceptors.request.use(
    (conf) => {
        const config = conf;
        const method = config.method.toLocaleLowerCase();

        // 如果是开发环境，所有请求前加api。走一层代理
        if (isFmtUrl(config)) {
            config.url = `/apiproxy${config.url}`;
        }

        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (isSerialize(config)) {
            config.data = qs.stringify(config.data);
        }

        // post loading
        if (config.loading !== 0) {
            loading = Loading.service({
                fullscreen: true,
                text: `${config.loading || loadingTips[method]}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.6)'
            });
        }

        return config;
    },
    (err) => {
        Message.error({ message: '请求超时，请稍后重试！' });

        return Promise.reject(err);
    }
);

// 响应统一处理
axios.interceptors.response.use((response) => {
    const res = response.data;

    // close loading
    loading.close();

    if (res.EngName) {
        return res;
    }

    const isSuccess = successCodes.some(item => item.success.includes(res[item.field]));

    if (isSuccess) {
        return res;
    }

    message(res);

    return Promise.reject(res);
}, (error) => {

    loading.close();
    message(error.response.data);

    return Promise.reject(error);
});

// 让axios支持 jsonp
axios.jsonp = (_url, options = {}) => {
    const { callback = 'callback' } = options;
    const url = `${_url}${(_url.indexOf('?') < 0 ? '?' : '&') + jsonToUrl(options)}`;

    return new Promise((resolve, reject) => {
        jsonp(url, {
            name: callback,
            param: 'jsonp'
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export default axios;
