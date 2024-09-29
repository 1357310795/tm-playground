import { Button, Col, Collapse, CollapseProps, DatePicker, Form, Input, Radio, Row, Space, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Head from "next/head";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import he from 'he';
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext, useEffect } from "react";
import { NotificationContext } from "@/contexts/notification";

type DataFormType = {
  sectionHeader1: string;
  sectionHint1: string;
  sectionHeader2: string;
  sectionHint2: string;
  infos: Array<{key: string, value: string}>;
  connector: string;
  school: string;
  department: string;
  time: dayjs.Dayjs;
  message: string;
  respIcon: string;
  respColor: string;
  respMessage: string;
};

dayjs.extend(utc)
dayjs.extend(timezone)

export default function Home() {
  const [first, setFirst] = useLocalStorage("first", "0");
  const noti = useContext(NotificationContext);

  useEffect(()=>{
    if (first === "0") {
      noti.warning({
        message: '重要提醒',
        description:
          '本项目仅供娱乐，请勿用于非法用途。本项目造成的一切后果由使用者承担',
        duration: 3,
      });
      setFirst("1");
    }
  }, [first]);

  const [form] = Form.useForm<DataFormType>();
  const formInitValues: DataFormType = {
    sectionHeader1: "志愿信息",
    sectionHint1: "",
    sectionHeader2: "待录取通知",
    sectionHint2: "接受或拒绝待录取通知后，将无法更改。",
    infos: [
      {"key": "层次", "value": "硕士"},
      {"key": "单位", "value": "清华大学"},
      {"key": "院系", "value": "计算机学院"},
      {"key": "专业", "value": "计算机科学与技术"},
      {"key": "学习方式", "value": "全日制"},
      {"key": "研究方向", "value": "人工智能"},
      {"key": "导师", "value": "不区分导师"},
      {"key": "专项计划类型", "value": "普通计划"},
      {"key": "就业类型", "value": "非定向就业"},
    ],
    connector: "：",
    school: "清华大学",
    department: "招生办",
    time: dayjs(),
    message: "请及时接受待录取通知",
    respIcon: "check",
    respColor: "#007F00",
    respMessage: "你于9月29日 09:00接受了清华大学的待录取通知",
  };

  const SectionHeaderConfig = () => (
    <>
      <Form.Item label="节标题1" name="sectionHeader1" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节提示1" name="sectionHint1" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节标题2" name="sectionHeader2" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节提示2" name="sectionHint2" required={false}>
        <Input placeholder="" />
      </Form.Item>
    </>
  );

  const VoluntaryInfoConfig = () => (
    <>
      <Form.Item label="键值连接符" name="connector">
        <Radio.Group>
          <Radio value="：">冒号</Radio>
          <Radio value={he.decode("&emsp;")}>全角空格</Radio>
          <Radio value={he.decode("&ensp;")}>半角空格</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.List name="infos">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  validateFirst
                  rules={[{ required: true, message: '请输入名称' }]}
                >
                  <Input placeholder="名称" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  validateFirst
                  rules={[{ required: true, message: '请输入值' }]}
                >
                  <Input placeholder="值" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                新增字段
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
  
  const NotificationConfig = () => (
    <>
      <Form.Item label="学校" name="school" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="部门" name="department" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="通知时间" name="time" required={false}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item label="通知信息" name="message" required={false}>
        <Input.TextArea placeholder="" />
      </Form.Item>
    </>
  );

  const ResponseConfig = () => (
    <>
      <Form.Item label="图标" name="respIcon" required={false}>
        <Radio.Group>
          <Radio value="check">✅</Radio>
          <Radio value="cross">❌</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="颜色" name="respColor" required={false}>
        <Radio.Group>
          <Radio value="#007F00">绿色</Radio>
          <Radio value="#F93B3B">红色</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="文字" name="respMessage" required={false}>
        <Input placeholder="" />
      </Form.Item>
    </>
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '节标题',
      children: <SectionHeaderConfig/>,
    },
    {
      key: '2',
      label: '志愿信息列表',
      children: <VoluntaryInfoConfig/>,
    },
    {
      key: '3',
      label: '通知详情',
      children: <NotificationConfig/>,
    },
    {
      key: '4',
      label: '通知反馈',
      children: <ResponseConfig/>,
    },
  ];

  const TmUiMain = () => (
    <div className="main-wrapper" style={{
      background: 'none',
      boxShadow: 'none',
      width: 'auto',
      marginLeft: 'unset',
      marginRight: 'unset',
      
    }}>
      <div
        className="ui-box"
        style={{
          border: 'solid 1px #ccc',
          borderBottom: 'none'
        }}
      >
        <div
          className="ui-box-head"
          style={{
            background: '#f9f9f9',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <h3
            className="ui-box-head-title zy-title"
            style={{
              fontSize: '14px',
              color: '#50aac2',
            }}
          >{form.getFieldValue("sectionHeader1")}</h3>
          <span className="ui-box-head-text">
            {form.getFieldValue("sectionHint1")}
          </span>
        </div>
        <div
          className="ui-box-container"
          style={{
            borderBottom: 'solid 1px #ccc'
          }}
        >
          <div className="ui-box-content">
            <dl
              className="ui-dlist"
              id="ui-dlist"
            >
              {form.getFieldValue("infos") && form.getFieldValue("infos").map(
                (x: {key: string, value: string}) => (
                  <>
                    <dt className="ui-dlist-tit">{x?.key}{form.getFieldValue("connector")}</dt>
                    <dd className="ui-dlist-det">
                      {x?.value}
                    </dd>
                  </>
                )
              )}
            </dl>
            <div style={{
              clear: 'both',
              fontSize: '0',
              lineHeight: '0'
            }}></div>
          </div>
        </div>
        <div
          className="ui-box-head"
          style={{
            background: '#f9f9f9',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <h3
            className="ui-box-head-title"
            style={{
              fontSize: '14px',
              color: '#c90'
            }}
          >
            {form.getFieldValue("sectionHeader2")}
          </h3>
          <span className="ui-box-head-text">
            {form.getFieldValue("sectionHint2")}
          </span>
        </div>
        <div
          className="ui-box-container"
          style={{
            borderBottom: 'solid 1px #ccc'
          }}
        >
          <div className="ui-box-content">
            <p style={{
              color: '#848484',
              fontFamily: '微软雅黑, tahoma, arial, "Hiragino Sans GB", 宋体'
            }}>
              {form.getFieldValue("school")}
              &nbsp;
              {form.getFieldValue("department")}
              &nbsp;
              {form.getFieldValue("time")?.format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <div className="ui-tiptext-container ui-tiptext-container-message">
              <div className="ui-tiptext-arrow ui-tiptext-arrowup">
                <em>◆</em>
                <span>◆</span>
              </div>
              <p className="ui-tiptext ui-tiptext-message">
              {form.getFieldValue("message")}
              </p>
              <p
                style={{ margin: '10px', textAlign: 'center' }}
              >
                <span
                  className="ui-button ui-button-ldisable"
                  style={{
                    color: form.getFieldValue("respColor"),
                    border: 'solid #ccc 1px'
                  }}
                >
                  <i
                    className="ui-tiptext-icon iconfont"
                  >
                  {
                    form.getFieldValue("respIcon")
                    .replace("check", he.decode("&#xF049;"))
                    .replace("cross", he.decode("&#61509;"))
                  }</i>
                  &nbsp;{form.getFieldValue("respMessage")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=utf-8"
        />
        <title>全国推荐免试攻读研究生（免初试、转段）信息公开管理服务系统</title>
      </Head>
      <div>
        <Row>
          <Typography>
            <Typography.Title level={3}>
              推免系统模拟器
            </Typography.Title>
          </Typography>
        </Row>
        <Form
            layout="horizontal"
            form={form}
            initialValues={formInitValues}
          >
          <Row>
            <Col span={9} style={{paddingRight: '12px'}}>
              <div style={{maxHeight: '80vh', overflowY: 'auto'}}>
                <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
              </div>
            </Col>
            <Col span={15} style={{paddingLeft: '24px'}}>
              <Form.Item noStyle shouldUpdate>
                {
                  () => (
                    <TmUiMain/>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <Form.Item noStyle shouldUpdate>
                {
                  () => (
                    JSON.stringify(form.getFieldValue("infos"))
                  )
                }
            </Form.Item>
          </Row> */}
        </Form>
      </div>
    </>
  )
}
