import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Head from "next/head";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext, useEffect } from "react";
import { NotificationContext } from "@/contexts/notification";

type DataFormType = {
  sectionHeader1: string;
  sectionHint1Name: string;
  sectionHint1Score: string;
  sectionHeader2: string;
  sectionHeader3: string;
  infos: Array<{ key: string; value: string }>;
  school: string;
  department: string;
  time: dayjs.Dayjs;
  message: string;
  respIcon: string;
  respColor: string;
  respMessage: string;
  tips: string;
};

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const [first, setFirst] = useLocalStorage("first", "0");
  const noti = useContext(NotificationContext);

  useEffect(() => {
    if (first === "0") {
      noti.warning({
        message: "重要提醒",
        description:
          "本项目仅供娱乐，请勿用于非法用途。本项目造成的一切后果由使用者承担",
        duration: 3,
      });
      setFirst("1");
    }
  }, [first, noti, setFirst]);

  const [form] = Form.useForm<DataFormType>();
  const formInitValues: DataFormType = {
    sectionHeader1: "待录取通知",
    sectionHint1Name: "张三",
    sectionHint1Score: "复试总成绩：114514",
    sectionHeader2: "志愿信息",
    sectionHeader3: "注意事项",
    infos: [
      { key: "招生单位", value: "清华大学" },
      { key: "层次", value: "硕士" },
      { key: "院系所", value: "计算机学院" },
      { key: "专业", value: "计算机科学与技术" },
      { key: "学习方式", value: "全日制" },
      { key: "研究方向", value: "人工智能" },
      { key: "导师", value: "不区分导师" },
      { key: "专项计划", value: "普通计划" },
      { key: "就业类型", value: "非定向就业" },
    ],
    school: "清华大学",
    department: "招生办",
    time: dayjs(),
    message: "请及时接受待录取通知",
    respIcon: "checkmark-circle-fill",
    respColor: "success",
    respMessage: "你于2025-09-25 14:00接受了清华大学的待录取通知",
    tips: [
      "1. 请在招生单位规定的时间内通过系统确认是否接受录取通知，未按时回复，招生单位可取消待录取通知。未通过系统接受待录取通知的立功表彰退役军人免试生不能被招生单位录取。",
      "2. 只能接受一个待录取通知。",
      "3. 招生单位取消待录取通知后，考生方可登录系统进行确认。确认取消待录取后，可接受其他单位的待录取通知。",
      "4. 请及时登录系统查看并处理相关通知。",
    ].join("\n"),
  };

  const SectionHeaderConfig = () => (
    <>
      <Form.Item label="节标题1" name="sectionHeader1" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节提示1姓名" name="sectionHint1Name" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节提示1成绩" name="sectionHint1Score" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节标题2" name="sectionHeader2" required={false}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="节标题3" name="sectionHeader3" required={false}>
        <Input placeholder="" />
      </Form.Item>
    </>
  );

  const VoluntaryInfoConfig = () => (
    <>
      <Form.List name="infos">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "key"]}
                  validateFirst
                  rules={[{ required: true, message: "请输入名称" }]}
                >
                  <Input placeholder="名称" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  validateFirst
                  rules={[{ required: true, message: "请输入值" }]}
                >
                  <Input placeholder="值" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
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
          <Radio value="checkmark-circle-fill">✅</Radio>
          <Radio value="close-fill">❌</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="颜色" name="respColor" required={false}>
        <Radio.Group>
          <Radio value="success">绿色</Radio>
          <Radio value="">红色</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="文字" name="respMessage" required={false}>
        <Input placeholder="" />
      </Form.Item>
    </>
  );

  const TipConfig = () => (
    <>
      <Form.Item label="注意事项" name="tips" required={false}>
        <Input.TextArea placeholder="" autoSize={{ minRows: 3, maxRows: 10 }} />
      </Form.Item>
    </>
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "节标题",
      children: <SectionHeaderConfig />,
    },
    {
      key: "2",
      label: "志愿信息列表",
      children: <VoluntaryInfoConfig />,
    },
    {
      key: "3",
      label: "通知详情",
      children: <NotificationConfig />,
    },
    {
      key: "4",
      label: "通知反馈",
      children: <ResponseConfig />,
    },
    {
      key: "5",
      label: "注意事项",
      children: <TipConfig />,
    },
  ];

  const TmUiMain = () => (
    <div
      className="container"
      style={{
        boxShadow: "none",
        width: "auto",
        marginLeft: "unset",
        marginRight: "unset",
        background: "#f7f8fa",
        paddingTop: "10px",
      }}
    >
      <div className="main-wrapper">
        <div className="ivu-breadcrumb">
          <span>
            <span className="ivu-breadcrumb-item-link">
              我的{form.getFieldValue("sectionHeader1")}
            </span>
            <span className="ivu-breadcrumb-item-separator">/</span>
          </span>
          <span>
            <span className="ivu-breadcrumb-item-link">
              {form.getFieldValue("sectionHeader1")}详情
            </span>
            <span className="ivu-breadcrumb-item-separator">/</span>
          </span>
        </div>
        <div className="ivu-layout-content">
          <div className="main-content fstz-detail">
            <div className="fstz-detail-box">
              <div className="title-box">
                {form.getFieldValue("sectionHeader1")}
              </div>
              <div className="xm">
                {form.getFieldValue("sectionHint1Name")}&emsp;
                {form.getFieldValue("sectionHint1Score")}
              </div>
              <div className="content">
                <div className="dwmc">
                  {form.getFieldValue("school")}{" "}
                  <span className="time">
                    {form.getFieldValue("time")?.format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <div className="tz-text">
                  {form.getFieldValue("message")}-
                  {form.getFieldValue("department")}
                </div>
              </div>
              <div className="fstz-footer">
                <div
                  className={
                    "fstz-tips status " + form.getFieldValue("respColor")
                  }
                >
                  <i
                    className={
                      "ch-icon ch-icon-" + form.getFieldValue("respIcon")
                    }
                  ></i>
                  {form.getFieldValue("respMessage")}
                </div>
              </div>
            </div>
            <div className="sub-title">
              {form.getFieldValue("sectionHeader2")}
            </div>
            <div className="bmxx-detail">
              {form.getFieldValue("infos") &&
                form
                  .getFieldValue("infos")
                  .map((x: { key: string; value: string }) => (
                    <>
                      <div className="bmxx-item">
                        <div className="bmxx-label">{x?.key}</div>
                        <div className="bmxx-value">{x?.value}</div>
                      </div>
                    </>
                  ))}
            </div>
            <div className="instructions">
              <strong>{form.getFieldValue("sectionHeader3")}</strong>
              {form.getFieldValue("tips") &&
                form
                  .getFieldValue("tips")
                  .split("\n")
                  .map((x: string) => (
                    <>
                      <br />
                      {x}
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>
          全国推荐免试攻读研究生（免初试、转段）信息公开管理服务系统
        </title>
      </Head>
      <div>
        <Row>
          <Typography>
            <Typography.Title level={3}>推免系统模拟器</Typography.Title>
          </Typography>
        </Row>
        <Form layout="horizontal" form={form} initialValues={formInitValues}>
          <Row>
            <Col span={9} style={{ paddingRight: "12px" }}>
              <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <Collapse
                  items={items}
                  bordered={false}
                  defaultActiveKey={["1"]}
                />
              </div>
            </Col>
            <Col span={15} style={{ paddingLeft: "24px" }}>
              <Form.Item noStyle shouldUpdate>
                {() => <TmUiMain />}
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
  );
}
