import axios from 'axios';
import { io } from 'socket.io-client';
import { API_BASE_URL } from './app.config';
import queryString, { StringifiableRecord } from 'query-string';

/**
 * HTTP 客户端
 */
export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * 设置本地存储
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地存储
 */
export const getStorage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : null;
};

/**
 * 处理地址查询符
 */
export const queryStringProcess = (queryStringObject: StringifiableRecord) => {
  Object.keys(queryStringObject).forEach(key => {
    if (queryStringObject[key] === undefined || queryStringObject[key] === '') {
      delete queryStringObject[key];
    }
  });

  return queryString.stringify(queryStringObject);
};

/**
 * Socket
 */
export const socket = io(API_BASE_URL);

/**
 * 日期范围
 */
export const getDateTimeRange = () => {
  // 选项
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  };

  // 语言
  const { language } = navigator;

  // 现在
  const now = new Date();

  // 当前日期
  const currentDate = new Date()
    .toLocaleDateString(language, options)
    .split('/')
    .join('-');

  // 一个月前
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))
    .toLocaleDateString(language, options)
    .split('/')
    .join('-');

  // 三个月前
  const threeMonthAgo = new Date(now.setMonth(now.getMonth() - 3))
    .toLocaleDateString(language, options)
    .split('/')
    .join('-');

  return [
    {
      text: '全部',
      value: [''],
    },
    {
      text: '一天',
      value: [currentDate, currentDate],
    },
    {
      text: '一个月',
      value: [oneMonthAgo, currentDate],
    },
    {
      text: '三个月',
      value: [threeMonthAgo, currentDate],
    },
  ];
};
