"use client";
import { useTranslations } from "next-intl";
import Typography from "../Typography/Typography";
import { usePathname } from "next/navigation";
import { pageTitleMap } from "@/constants/pageTitleMap";
import ButtonLink from "../Button/ButtonLink";
import { appRoute } from "@/constants/appRoute";
import { HomeIcon } from "@heroicons/react/20/solid";

const Navigation = () => {
  const pathname = usePathname();
  const t = useTranslations(
    pageTitleMap[pathname as keyof typeof pageTitleMap]
  );

  return (
    <nav className="bg-slate-300 py-6 px-12 border-slate-400 border-b-4 flex items-center gap-4">
      <ButtonLink href={appRoute.home} variant="inline" className="p-0">
        <HomeIcon className="w-6 h-6" />
      </ButtonLink>
      <Typography variant="subheading">{t("pageTitle")}</Typography>
    </nav>
  );
};

export default Navigation;
