import { NextRequest ,NextResponse} from "next/server";
    import { writeFile } from 'fs/promises';

export async function GET() {
    // This function would typically fetch banners from a database or an external API
    const banners = [
        { id: 1, title: "Banner 1", image: "/images/banner1.jpg" },
        { id: 2, title: "Banner 2", image: "/images/banner2.jpg" },
        { id: 3, title: "Banner 3", image: "/images/banner3.jpg" }
    ];
    
      return NextResponse.json({banners: banners}, {status : 200})
}

// export async function POST(request: NextRequest) {
//     const data = await request.json();

//     const file = request.body.get('image');
//     // Here you would typically save the banner to a database
//     return NextResponse.json({ message: 'Banner created', banner: data }, { status: 201 });
// }


export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
  

    // إذا تريد حفظ الصورة في السيرفر
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // مثال: حفظ الصورة في مجلد داخل project
    await writeFile(`./public/uploads/${file.name}`, buffer);

    return NextResponse.json({ message: 'Banner created', title, filename: file.name }, { status: 201 });
}
