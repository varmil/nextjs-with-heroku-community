import Input from 'reactstrap/lib/Input'

const Index = props => (
  <Input
    {...props}
    type={props.type || 'text'}
    className={`form-control ${props.className}`}
    style={{ ...props.style, height: 50, borderRadius: 0 }}
  />
)
export default Index
