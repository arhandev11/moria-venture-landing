CREATE TABLE `admin_sessions` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(120) NOT NULL,
	`password_hash` varchar(100) NOT NULL,
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `form_options` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` enum('region','ticket') NOT NULL,
	`label` varchar(120) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `form_options_id` PRIMARY KEY(`id`),
	CONSTRAINT `form_options_kind_label_uq` UNIQUE(`kind`,`label`)
);
--> statement-breakpoint
CREATE TABLE `investor_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(255) NOT NULL,
	`region` varchar(120) NOT NULL,
	`ticket` varchar(120) NOT NULL,
	`message` text NOT NULL,
	`shortlist` text NOT NULL,
	`status` enum('new','handled') NOT NULL DEFAULT 'new',
	`handled_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `investor_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `smes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`sector` varchar(60) NOT NULL,
	`city` varchar(80) NOT NULL,
	`stage` varchar(40) NOT NULL,
	`status` enum('program','funded') NOT NULL DEFAULT 'program',
	`brief` text NOT NULL,
	`ask_k` int NOT NULL,
	`interest_pct` int,
	`metrics` varchar(255) NOT NULL,
	`raised_k` int,
	`investor` varchar(120),
	`quote` text,
	`image_file` varchar(100),
	`sort_order` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `smes_id` PRIMARY KEY(`id`),
	CONSTRAINT `smes_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `admin_sessions` ADD CONSTRAINT `admin_sessions_user_id_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `admin_sessions_user_idx` ON `admin_sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `investor_requests_created_idx` ON `investor_requests` (`created_at`);--> statement-breakpoint
CREATE INDEX `smes_order_idx` ON `smes` (`published`,`sort_order`);