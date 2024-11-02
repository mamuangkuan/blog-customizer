import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	onUpdate,
}: {
	onUpdate: (settings: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localSettings, setLocalSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleSelectChange = (
		name: keyof ArticleStateType,
		value: OptionType
	) => {
		setLocalSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};

	const handleRadioChange = (
		name: keyof ArticleStateType,
		value: OptionType
	) => {
		setLocalSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate(localSettings);
	};

	const handleReset = () => {
		setLocalSettings(defaultArticleState);
		onUpdate(defaultArticleState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<div className={styles.group}>
						<Select
							options={fontFamilyOptions}
							selected={localSettings.fontFamilyOption}
							onChange={(value) =>
								handleSelectChange('fontFamilyOption', value)
							}
							title='Шрифт'
						/>
					</div>
					<div className={styles.group}>
						<RadioGroup
							name='fontSizeOption'
							options={fontSizeOptions}
							selected={localSettings.fontSizeOption}
							onChange={(value) => handleRadioChange('fontSizeOption', value)}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.group}>
						<Select
							options={fontColors}
							selected={localSettings.fontColor}
							onChange={(value) => handleSelectChange('fontColor', value)}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />
					<div className={styles.group}>
						<Select
							options={backgroundColors}
							selected={localSettings.backgroundColor}
							onChange={(value) => handleSelectChange('backgroundColor', value)}
							title='Цвет фона'
						/>
					</div>
					<div className={styles.group}>
						<Select
							options={contentWidthArr}
							selected={localSettings.contentWidth}
							onChange={(value) => handleSelectChange('contentWidth', value)}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};