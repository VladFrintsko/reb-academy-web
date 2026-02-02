import {
    Document,
    Font,
    Page,
    StyleSheet,
    Text,
    View,
    pdf,
} from "@react-pdf/renderer";
import { useState } from "react";
import { DocsTopbar } from "../docs/components";

Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
            fontWeight: 400,
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
            fontWeight: 700,
        },
    ],
});

interface DocumentData {
    title: string;
    author: string;
    date: string;
    content: string;
    footer: string;
}

const INITIAL_DATA: DocumentData = {
    title: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
    footer: "",
};

const pdfStyles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Roboto",
        fontSize: 11,
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 20,
    },
    meta: {
        fontSize: 11,
        color: "#666",
        marginBottom: 20,
    },
    metaLine: {
        marginBottom: 4,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginVertical: 16,
    },
    content: {
        fontSize: 11,
        lineHeight: 1.6,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 9,
        color: "#999",
    },
});

function PdfDocument({ data }: { data: DocumentData }) {
    const { title, author, date, content, footer } = data;

    return (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                <Text style={pdfStyles.title}>{title || "Без назви"}</Text>

                {(author || date) && (
                    <View style={pdfStyles.meta}>
                        {author && (
                            <Text style={pdfStyles.metaLine}>Автор: {author}</Text>
                        )}
                        {date && (
                            <Text style={pdfStyles.metaLine}>Дата: {date}</Text>
                        )}
                    </View>
                )}

                <View style={pdfStyles.divider} />

                <Text style={pdfStyles.content}>{content}</Text>

                {footer && <Text style={pdfStyles.footer}>{footer}</Text>}
            </Page>
        </Document>
    );
}

async function generateAndDownloadPdf(data: DocumentData): Promise<void> {
    const blob = await pdf(<PdfDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = data.title
        ? `${data.title.toLowerCase().replace(/\s+/g, "-")}.pdf`
        : "document.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: "text" | "date" | "textarea";
    placeholder?: string;
    rows?: number;
}

function FormField({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    rows = 10,
}: FormFieldProps) {
    const baseClassName =
        "w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    className={`${baseClassName} resize-none`}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClassName}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}

interface PreviewProps {
    data: DocumentData;
}

function Preview({ data }: PreviewProps) {
    const { title, author, date, content, footer } = data;

    return (
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-neutral-400">
                Попередній перегляд
            </h2>
            <div
                className="bg-white text-black rounded p-8 min-h-[600px] shadow-lg relative"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
            >
                <h3 className="text-2xl font-bold text-center mb-6">
                    {title || "Без назви"}
                </h3>

                {(author || date) && (
                    <div className="text-sm text-gray-600 mb-6">
                        {author && <p>Автор: {author}</p>}
                        {date && <p>Дата: {date}</p>}
                    </div>
                )}

                <hr className="my-4 border-gray-300" />

                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {content || "Ваш контент з'явиться тут..."}
                </div>

                {footer && (
                    <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export function PdfGeneratorPage() {
    const [formData, setFormData] = useState<DocumentData>(INITIAL_DATA);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGeneratePdf = async () => {
        setIsGenerating(true);

        try {
            await generateAndDownloadPdf(formData);
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Помилка при генерації PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <DocsTopbar />

            <div className="mx-auto w-full max-w-4xl px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">PDF Генератор</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <FormField
                            label="Назва документу"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Введіть назву документу"
                        />

                        <FormField
                            label="Автор"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Введіть ім'я автора"
                        />

                        <FormField
                            label="Дата"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                        />

                        <FormField
                            label="Контент"
                            name="content"
                            type="textarea"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Введіть текст документу..."
                        />

                        <FormField
                            label="Футер"
                            name="footer"
                            value={formData.footer}
                            onChange={handleChange}
                            placeholder="Текст внизу кожної сторінки"
                        />

                        <button
                            type="button"
                            onClick={handleGeneratePdf}
                            disabled={isGenerating}
                            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors cursor-pointer"
                        >
                            {isGenerating ? "Генерація..." : "Згенерувати PDF"}
                        </button>
                    </div>

                    <Preview data={formData} />
                </div>
            </div>
        </div>
    );
}
