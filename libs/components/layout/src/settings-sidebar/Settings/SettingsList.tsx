import {
    Divider,
    ListItem,
    Option,
    Select,
    styled,
    Switch,
} from '@toeverything/components/ui';
import { useTranslation } from 'react-i18next';
import { options } from '../../i18n';
import { useSettings } from './use-settings';

export const SettingsList = () => {
    const settings = useSettings();
    const { i18n } = useTranslation();
    const changeLanguage = event => {
        i18n.changeLanguage(event);
    };

    return (
        <StyledSettingsList>
            {settings.map((item, index) => {
                const type = item.type;
                if (type === 'separator') {
                    return <Divider key={index} />;
                }

                if (type === 'switch') {
                    return (
                        <SwitchItemContainer
                            key={item.key}
                            onClick={() => {
                                item.onChange(!item.value);
                            }}
                        >
                            <span>{item.name}</span>
                            <Switch
                                checked={item.value}
                                checkedLabel="ON"
                                uncheckedLabel="OFF"
                            />
                        </SwitchItemContainer>
                    );
                }

                return (
                    <ListItem key={item.key} onClick={() => item.onClick()}>
                        {item.name}
                        {item.key === 'Language' ? (
                            <div style={{ marginLeft: '12em' }}>
                                <Select
                                    defaultValue={options[0].value}
                                    onChange={changeLanguage}
                                >
                                    {options.map(option => (
                                        <Option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.text}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        ) : null}
                    </ListItem>
                );
            })}
        </StyledSettingsList>
    );
};

const StyledSettingsList = styled('div')({
    overflow: 'auto',
    padding: '0 4px',
});

const SwitchItemContainer = styled(ListItem)({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
});
