import { createRoot } from 'react-dom/client';
import { StrictMode, useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleUpdateSettings = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	const customStyles: CSSProperties = {
		'--font-family': settings.fontFamilyOption.value,
		'--font-size': settings.fontSizeOption.value,
		'--font-color': settings.fontColor.value,
		'--container-width': settings.contentWidth.value,
		'--bg-color': settings.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={customStyles}>
			<ArticleParamsForm onUpdate={handleUpdateSettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
