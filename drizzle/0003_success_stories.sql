-- Success stories on /kneks: article-style posts, optionally about one SME.
-- New table only; nothing existing changes. Deleting an SME keeps its stories
-- and unlinks them (ON DELETE SET NULL).
CREATE TABLE `success_stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`title` varchar(160) NOT NULL,
	`excerpt` varchar(300) NOT NULL,
	`body` text NOT NULL,
	`cover_file` varchar(100),
	`cover_asset` varchar(200),
	`cover_alt` varchar(200),
	`sme_id` int,
	`source_line` varchar(200),
	`published_at` date NOT NULL,
	`is_sample` boolean NOT NULL DEFAULT false,
	`published` boolean NOT NULL DEFAULT true,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `success_stories_id` PRIMARY KEY(`id`),
	CONSTRAINT `success_stories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `success_stories` ADD CONSTRAINT `success_stories_sme_id_smes_id_fk` FOREIGN KEY (`sme_id`) REFERENCES `smes`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `success_stories_order_idx` ON `success_stories` (`published`,`sort_order`);--> statement-breakpoint
CREATE INDEX `success_stories_sme_idx` ON `success_stories` (`sme_id`);