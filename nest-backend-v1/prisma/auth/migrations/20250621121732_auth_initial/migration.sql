-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "InactiveUserStatus" AS ENUM ('Inactive', 'Unsubscribed');

-- CreateTable
CREATE TABLE "config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "config_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "real_name" TEXT,
    "nick_name" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "email_verified_at" TIMESTAMP(3),
    "mobile_verified_at" TIMESTAMP(3),
    "email_is_verified" INTEGER DEFAULT 0,
    "mobile_is_verified" INTEGER DEFAULT 0,
    "password" TEXT,
    "profile_img" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picture_users" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rx_fcm" INTEGER DEFAULT 0,
    "rx_sms" INTEGER DEFAULT 0,
    "rx_email" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "picture_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picture_admins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "classification_id" TEXT,
    "status" "UserStatus" DEFAULT 'ACTIVE',
    "status_changed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "picture_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picture_user_addresses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "real_name" TEXT DEFAULT '',
    "phone" TEXT DEFAULT '',
    "street_address" VARCHAR(255),
    "ground_address" TEXT NOT NULL,
    "detailed_address" TEXT NOT NULL,
    "postcode" INTEGER DEFAULT 1,
    "flag" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "picture_user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "admin_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permission" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "temp_key" TEXT,
    "temp_key_expires_at" TIMESTAMP(3),
    "last_login_date" TIMESTAMP(3),
    "inactive_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_otp" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "otp_expires_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inactive_and_unsubscribed_user" (
    "id" TEXT NOT NULL,
    "real_name" TEXT,
    "nick_name" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "email_verified_at" TIMESTAMP(3),
    "mobile_verified_at" TIMESTAMP(3),
    "email_is_verified" INTEGER DEFAULT 0,
    "mobile_is_verified" INTEGER DEFAULT 0,
    "password" TEXT,
    "status" "InactiveUserStatus" DEFAULT 'Inactive',
    "inactive_date" TIMESTAMP(3),
    "unsubscribed_date" TIMESTAMP(3),
    "unsubscribed_reason" TEXT,
    "unsubscribe_comments" TEXT,
    "profile_img" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inactive_and_unsubscribed_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nick_name_key" ON "user"("nick_name");

-- CreateIndex
CREATE UNIQUE INDEX "picture_users_user_id_key" ON "picture_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "picture_admins_user_id_key" ON "picture_admins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_types_name_key" ON "admin_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_name_key" ON "classifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_user_id_key" ON "user_session"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture_users" ADD CONSTRAINT "picture_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture_admins" ADD CONSTRAINT "picture_admins_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture_admins" ADD CONSTRAINT "picture_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture_user_addresses" ADD CONSTRAINT "picture_user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "picture_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_admin_type_id_fkey" FOREIGN KEY ("admin_type_id") REFERENCES "admin_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
