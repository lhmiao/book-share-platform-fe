import React, { Fragment } from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';
import PictureInput from 'components/PictureInput';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: RadioGroup, Button: RadioButton } = Radio;

function CreateBookForm(props) {
  const {
    isEdit, form, bookName, intro, price, onSell, preview,
    author,
  } = props;

  function buildView() {
    return null;
  }

  if (!isEdit) {
    return buildView();
  }

  const { getFieldDecorator } = form;
  return (
    <Fragment>
      <FormItem label="预览图">
        {getFieldDecorator('preview', {
          initialValue: preview,
          rules: [{ required: true, message: '请上传预览图' }],
        })(
          <PictureInput />
        )}
      </FormItem>
      <FormItem label="名称">
        {getFieldDecorator('bookName', {
          initialValue: bookName,
          rules: [{ required: true, message: '请输入书名' }],
        })(
          <Input placeholder="请输入书名" />
        )}
      </FormItem>
      <FormItem label="作者">
        {getFieldDecorator('author', {
          initialValue: author,
          rules: [{ required: true, message: '请输入作者' }],
        })(
          <Input placeholder="请输入作者" />
        )}
      </FormItem>
      <FormItem label="简介">
        {getFieldDecorator('intro', {
          initialValue: intro,
        })(
          <TextArea placeholder="请输入简介" autosize={{ minRows: 3 }} />
        )}
      </FormItem>
      <FormItem label="所需图书币">
        {getFieldDecorator('price', {
          initialValue: price,
          rules: [{ required: true, message: '请输入所需图书币' }],
        })(
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="请输入所需图书币"
          />
        )}
      </FormItem>
      <FormItem label="是否可交易">
        {getFieldDecorator('onSell', {
          initialValue: onSell,
        })(
          <RadioGroup>
            <RadioButton value={true}>是</RadioButton>
            <RadioButton value={false}>否</RadioButton>
          </RadioGroup>
        )}
      </FormItem>
    </Fragment>
  );
}

CreateBookForm.defaultProps = {
  isEdit: true,
  bookName: '',
  intro: '',
  price: undefined,
  onSell: true,
  author: '',
};

export default Form.create()(CreateBookForm);