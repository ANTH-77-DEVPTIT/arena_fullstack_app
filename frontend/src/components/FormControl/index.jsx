import PropTypes from 'prop-types'
import { RadioButton, Select, Stack, TextField } from '@shopify/polaris'
import MyDropZoneMultiple from '../MyDropZoneMultiple'
import MyDropZoneSingle from '../MyDropZoneSingle'

//kiem tra duoc cac kieu du lieu ma component nhan duoc
//biet ro duoc cac loai du lieu cua props truyen vao cho dung
//nay la proptype trong reactjs nhes
//no da duoc tach ra tu version react 15.5
//tich hop trong prop-types npm de thay the trong reactjs
FormControl.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'date', 'radio', 'select', 'file']),
  label: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  required: PropTypes.bool,
  allowMultiple: PropTypes.bool,
}
/**
 * https://vi.reactjs.org/docs/typechecking-with-proptypes.html
 *
 * prop-types: validator data nhan vao la valid
 * neu khong thi no se warning.
 * //khai bao cac kieu du lieu trong JS: array, bool, func, obk, string, symbol, element, component,
 * PropTypes.instancesOf(): Khai bao cho no vi du nhu la mot class
 * PropTypes.oneOf(['','','','',...]) gioi han cu the gia tri truyen vao
 */
//dat gia tri mac dinh cho props thong qua defaultProps
FormControl.defaultProps = {
  type: 'text',
  label: '',
  value: null,
  error: null,
  onChange: () => null,
  disabled: false,
  placeholder: '',
  helpText: '',
  autoFocus: false,
  options: [],
  required: false,
  allowMultiple: false,
}

function FormControl(props) {
  const {
    type,
    label,
    value,
    error,
    onChange,
    disabled,
    placeholder,
    helpText,
    autoFocus,
    options,
    required,
    allowMultiple,
  } = props

  let _label = required ? (
    <span>
      {label}
      <b style={{ color: 'rgb(220, 53, 69)' }}>*</b>
    </span>
  ) : (
    label
  )

  switch (type) {
    case 'file':
      return (
        <Stack vertical spacing="extraTight">
          <Stack.Item>{_label}</Stack.Item>
          <Stack.Item>
            {allowMultiple ? (
              <MyDropZoneMultiple files={value} onChange={onChange} />
            ) : (
              <MyDropZoneSingle file={value} onChange={onChange} />
            )}
          </Stack.Item>
        </Stack>
      )
      break

    case 'select':
      return (
        <Select label={_label} options={options} onChange={onChange} value={value} error={error} />
      )
      break

    case 'radio':
      return (
        <Stack vertical spacing="extraTight">
          <Stack.Item>{_label}</Stack.Item>
          <Stack.Item>
            <Stack>
              {options?.length > 0 &&
                options.map((item, index) => (
                  <Stack.Item key={index}>
                    <RadioButton
                      label={item.label}
                      checked={Boolean(item.value == value)}
                      onChange={() => onChange(item.value)}
                    />
                  </Stack.Item>
                ))}
            </Stack>
          </Stack.Item>
        </Stack>
      )
      break

    default:
      // text
      return (
        <TextField
          type={type}
          label={_label}
          value={value}
          error={error}
          onChange={onChange}
          disabled={Boolean(disabled)}
          placeholder={placeholder}
          helpText={helpText}
          autoFocus={Boolean(autoFocus)}
        />
      )
      break
  }
}

export default FormControl
