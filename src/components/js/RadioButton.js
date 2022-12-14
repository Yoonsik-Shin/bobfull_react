import Form from "react-bootstrap/Form";

function RadioButton(props) {
  return (
    <Form style={{ marginTop: "15px" }}>
      {["radio"].map((type, idx) => (
        <div key={idx}>
          <Form.Check
            inline
            label="성별 상관없어요"
            name="group1"
            value={0}
            type={type}
            id={`inline-${type}-1`}
            onChange={props.checkGenderInput}
          />
          <Form.Check
            inline
            label="같은 성별이 편해요"
            name="group1"
            value={1}
            type={type}
            id={`inline-${type}-2`}
            onChange={props.checkGenderInput}
          />
        </div>
      ))}
    </Form>
  );
}

export default RadioButton;
