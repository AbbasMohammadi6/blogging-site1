import Image from "next/image";
import styles from "styles/Showcase.module.scss";

const ShowCase = () => {
	return (
		<section className={styles.main}>
			<Image
				alt="Mountains"
				src="/showcaseImage.jpg"
				layout="fill"
				objectFit="cover"
				quality={100}
			/>

			<div className={styles.overlay} />

			<div className={styles.summary}>
				<h1>تار نوشت</h1>
				<h3>جایگزین وبلاگ‌های سنتی، در دوران شبکه‌های اجتماعی</h3>
				<p className={styles.firstPar}>
					چرا از تارنوشت به جای وبلاگ‌های سنتی استفاده کنیم؟ به دلیل ساختار
					وبلاگ‌های قدیمی شما اگه وبلاگی با مطالب خوب درست کنید، ممکنه عملاُ
					خواننده‌ای نداشته باشید. ولی وقتی شما نوشته‌ی خودتون رو در تارنوشت
					انتشار می‌دید، پست شما در قسمت پستهای جدید در صفحه‌ی اصلی تارنوشت
					نمایش داده میشه و در این صورت تمام کاربران نوشته‌ی شما رو می‌بینند و
					در صورت علاقه وارد پست شما می‌شن. پس شما میتونید بهتر دیده بشید.
				</p>
				<p className={styles.secondPar}>
					مثل شبکه‌های اجتماعی، میتونید پست ها رو لایک کنید و نویسنده محبوبتون
					رو دنبال کنید.
				</p>
			</div>
		</section>
	);
};

export default ShowCase;
