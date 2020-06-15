有道音频路径：http://dict.youdao.com/dictvoice?type=3&audio=no
http://fanyi.youdao.com/openapi.do?keyfrom=lewe518&key=70654389&type=data&doctype=json&version=1.1&q=

http://dict.youdao.com/jsonapi?jsonversion=2&client=mobile
&q=love&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22
newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22
%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%
22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%
22exam_dict%22%2C%22ctc%22%2C%22web_search
%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22
wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part
%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22
newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22
longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22
web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&
model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800
&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1
版本：1.1，请求方式：get，编码方式：utf-8

主要功能：中英互译，同时获得有道翻译结果和有道词典结果（可能没有）

参数说明：

　type - 返回结果的类型，固定为data

　doctype - 返回结果的数据格式，xml或json或jsonp

　version - 版本，当前最新版本为1.1

　q - 要翻译的文本，必须是UTF-8编码，字符长度不能超过200个字符，需要进行urlencode编码

　only - 可选参数，dict表示只获取词典数据，translate表示只获取翻译数据，默认为都获取

　注： 词典结果只支持中英互译，翻译结果支持英日韩法俄西到中文的翻译以及中文到英语的翻译

errorCode：

　0 - 正常

　20 - 要翻译的文本过长

　30 - 无法进行有效的翻译

　40 - 不支持的语言类型

　50 - 无效的key

　60 - 无词典结果，仅在获取词典结果生效


扇贝
https://api.shanbay.com/bdc/search/?word=like
分类
https://www.shanbay.com/api/v1/vocabtest/category/

https://www.shanbay.com/api/v1/vocabtest/vocabularies/