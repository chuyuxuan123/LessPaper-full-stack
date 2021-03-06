import React, { Component } from 'react';

import { Steps, Button, message, Input, Row, Col, Upload, Icon, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AddQuestion from './AddQuestion';

const Step = Steps.Step;
const Aq = Form.create({ name: 'dynamic_form_item' })(AddQuestion);

class NewQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            msg: '',
            content:'',
        }
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handelMsg = (e) => {
        this.setState({
            msg: e.target.value
        })
    }

    handelContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    //TODOS:上传答案
    handelSubmit = (e) => {
        message.success('上传成功');
        this.props.history.push("/home");
        // window.location.href = "/home" ;
    }

    //TODO:暂存写入的数据
    tempStore = () => { }
    render() {
        const steps = [
            (
                <div>
                    <h1>考试信息</h1>
                    <TextArea id="msg" rows={6} onChange={this.handelMsg} value={this.state.msg} />
                </div>
            )
            ,
            (
                <div>
                    <h1>题目信息</h1>
                    <Aq />
                </div>
            )
            ,
            (
                <div>
                    <h1>传参考答案</h1>
                    <Upload.Dragger>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                        <p className="ant-upload-hint">支持单个或批量上传。 严格禁止上传公司数据或其他档案文件</p>
                    </Upload.Dragger>
                </div>
            )
        ]
        const { current } = this.state;
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle" >
                    <Col span={20}>
                        <Steps current={current} style={{ paddingTop: "30px", paddingBottom: "30px" }} >
                            <Step title="第一步" description="考试信息" />
                            <Step title="第二步" description="添加题目" />
                            <Step title="第三步" description="上传参考答案" />
                        </Steps>
                        <div className="steps-content">{steps[current]}</div>
                        <div className="steps-action" style={{paddingTop:"15px"}} >
                            {
                                current < steps.length - 1
                                && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                            }
                            {
                                current === steps.length - 1
                                && <Button type="primary" onClick={this.handelSubmit}>完成</Button>
                            }
                            {
                                current > 0
                                && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default NewQuestionPage;