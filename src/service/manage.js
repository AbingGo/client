import statistics from '@/api/statistics';

export const getList = async (params) => {
    console.log(params);
};

export const getUserInfo = async (params) => {
    const res = await statistics.getUserInfo(params);

    return res;
};
