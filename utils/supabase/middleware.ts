import {createServerClient} from "@supabase/ssr";
import {type NextRequest, NextResponse} from "next/server";

export const updateSession = async (request: NextRequest) => {
  const protectedRoutes = ["/home", "/projetos"];

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
          },
        },
      }
    );

    // Obtém a sessão do usuário
    const {
      data: {session},
    } = await supabase.auth.getSession();

    // Se a rota atual for "/" e o usuário estiver logado, redireciona para "/home"
    if (request.nextUrl.pathname === "/" && session) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    // Verifica se a rota atual está protegida
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      // Se a sessão não existir, redireciona para a página de login
      if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Se a sessão existir ou a rota não estiver protegida, continua a execução normal
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Atualiza os cookies no response
    const cookiesToSet = request.cookies.getAll();
    cookiesToSet.forEach(({name, value, options}) => response.cookies.set(name, value, options));

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
