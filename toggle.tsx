const ToggleValue: React.FC<ToggleValueProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <RadioGroup
      label={t('olm~Show operands in:')}
      currentValue={value}
      inline
      items={[
        {
          value: ToggleOptions.LEFT_OPTION,
          title: t('olm~All namespaces'),
        },
        {
          value: ToggleOptions.RIGHT_OPTION,
          title: t('olm~Current namespace only'),
        },
      ]}
      onChange={({ currentTarget }) => onChange(currentTarget.value)}
    />
  );
};

export default ToggleValue;

type ToggleValueProps = {
  value: ToggleOptions;
  onChange: (newValue: ToggleOptions) => void;
};
      
export enum ToggleOptions {
  LEFT_OPTION = 'left',
  RIGHT_OPTION = 'right',
}
      
      
const useToggleValuesChange = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeToggle = useSelector((state: RootState) => state.UI.getIn(['activeToggle']));
  const [toggleOption, setToggleOption] = React.useState<ToggleOptions>(activeToggle.option);
  const [toggleValue, setToggleValue] = React.useState<boolean>(activeToggle.value);

  const changeToggleOption = (newValue: ToggleOptions): void => {
    setToggleOption(newValue);
    dispatch(UIActions.setActiveToggle(newValue, !toggleValue));
  };
  const onChangeToggleOption = (newValue: ToggleOptions) => {
    switch (newValue) {
      case ToggleOptions.LEFT_OPTION:
        changeToggleOption(ToggleOptions.LEFT_OPTION);
        setToggleValue(true);
        break;
      case ToggleOptions.RIGHT_OPTION:
        changeToggleOption(ToggleOptions.RIGHT_OPTION);
        setToggleValue(false);
        break;
      default:
        throw new Error(t('olm~Invalid value {{value}}', { value: newValue }));
    }
  };
  return { toggleOption, toggleValue, onChangeToggleOption };
};

export default useToggleValuesChange;      
      
// use the hooks in component
 const { toggleOption, toggleValue, onChangeToggleOption } = useToggleValuesChange();      
