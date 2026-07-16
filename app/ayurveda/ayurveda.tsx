"use client";
import { useEffect, useState } from "react";
import EditorPageLayout from "../components/editors-page/EditorPageLayout";
import EditorImageBlock from "../components/editors-page/EditorImageBlock";


interface LinkItem {
  title: string;
  url: string;
}

interface ContentItem {
  type: string;
  html?: string;
  src?: string;
  caption?: string;
  text?: string;
  items?: LinkItem[];
}

interface PageData {
  title: string;
  content: ContentItem[];
}
export default function AyurvedaPage() {

  const [data, setData] = useState<PageData>({
    title: "",
    content: [],
  });

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${baseUrl}/ayurveda`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(console.error);
  }, []);
  return (
    <EditorPageLayout title={data.title}>
      {data.content.map((item, index) => {
        switch (item.type) {
          case "paragraph":
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: item.html || "" }}
              />
            );
          case "image":
            return (
              <EditorImageBlock
                key={index}
                src={item.src || ""}
                alt=""
                caption={item.caption || ""}
              />
            );

          case "caption":
            return (
              <p
                key={index}
                className="italic text-lg md:text-xl py-1 text-[#680007]"
              >
                {item.text}
              </p>
            );

          case "heading":
            return (
              <div
                key={index}
                className="pt-8 mt-8 border-t border-[#680007]/10"
              >
                <h3 className="font-samarn text-xl text-[#680007] mb-4 tracking-wider uppercase">
                  {item.text}
                </h3>
              </div>
            );

          case "links":
            return (
              <ul key={index} className="space-y-2 list-none pl-0">
                {item.items?.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="text-[#680007] hover:text-[#b38e5d] transition-colors underline decoration-[#680007]/30 hover:decoration-[#b38e5d]"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </EditorPageLayout>
  );
}