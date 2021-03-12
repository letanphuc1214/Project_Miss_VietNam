package project_missvietnam.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public DataSource dataSource;

        //check login
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.inMemoryAuthentication()
                    .withUser("admin").password("{noop}12345").roles("ADMIN");
        }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/**").permitAll()
                .and()
                .authorizeRequests().antMatchers("/candidates","/ethnicities","/educations","/provinces","/blogs", "/admin").hasAnyRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers("/candidatesDeleted","/ethnicitysDeleted","/educationsDeleted","/provincesDeleted","/blogsDeleted").hasAnyRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers("/blogadd","/blogview","/blogedit/**").hasAnyRole("ADMIN")
                .and()
                .formLogin().loginPage("/login")
                .defaultSuccessUrl("/default")
                .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/login");
        http.csrf().disable();
    }
}
